import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import { CreateClientDto, UpdateClientDto } from '../dtos/clients.dto';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { UsersService } from './users.service';
import { WalletsService } from '../../finances/services/wallets.service';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientsRepository: Repository<Client>,
    private usersService: UsersService,
    private walletsService: WalletsService,
  ) {}

  private calculateAge(dateOfBirth: Date) {
    const diff = Date.now() - dateOfBirth.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  async create(clientData: CreateClientDto, userData: CreateUserDto) {
    const age = this.calculateAge(clientData.dateOfBirth);
    if (age < 18) {
      throw new BadRequestException([`Debes ser mayor de edad`]);
    }
    const user = await this.usersService.exist(userData?.email);
    if (user) {
      throw new BadRequestException([
        `El usuario ${userData?.email} ya existe`,
      ]);
    }
    const newUser = await this.usersService.create(userData);
    const newClient = this.clientsRepository.create({
      ...clientData,
      user: newUser,
    });
    const savedClient = await this.clientsRepository.save(newClient);
    await this.walletsService.create({ balance: 0, client: newClient });
    return savedClient;
  }

  async findMyself(id: string) {
    const client = await this.clientsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!client) {
      throw new NotFoundException(`Cliente ${id} no encontrado`);
    }
    return client;
  }

  async findMyWallet(id: string) {
    const client = await this.clientsRepository.findOne({
      where: { id },
      relations: ['wallet'],
    });
    if (!client) {
      throw new NotFoundException(`Cliente ${id} no encontrado`);
    }
    return client.wallet;
  }

  async findMyPaymentCards(id: string) {
    const client = await this.clientsRepository.findOne({
      where: { id },
      relations: ['paymentCards'],
    });
    if (!client) {
      throw new NotFoundException(`Cliente ${id} no encontrado`);
    }
    return client.paymentCards;
  }

  async findMyPurchases(id: string) {
    const client = await this.clientsRepository.findOne({
      where: { id },
      relations: ['purchases'],
    });
    if (!client) {
      throw new NotFoundException(`Cliente ${id} no encontrado`);
    }
    return client.purchases;
  }

  async updateMyself(
    id: string,
    clientChanges: UpdateClientDto,
    userChanges: UpdateUserDto,
  ) {
    const client = await this.clientsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!client) {
      throw new NotFoundException([`Cliente ${id} no encontrado`]);
    }
    if (clientChanges?.dateOfBirth) {
      const age = this.calculateAge(clientChanges.dateOfBirth);
      if (age < 18) {
        throw new BadRequestException([`Debes ser mayor de edad`]);
      }
    }
    const user = await this.usersService.update(client?.user?.id, userChanges);
    this.clientsRepository.merge(client, clientChanges);
    return this.clientsRepository.save({ ...client, user });
  }

  async delete(id: string) {
    const client = await this.clientsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!client) {
      throw new NotFoundException(`Cliente ${id} no encontrado`);
    }
    return this.usersService.delete(client?.user?.id);
  }
}
