import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import { CreateClientDto } from '../dtos/clients.dto';
import { CreateUserDto } from '../dtos/users.dto';
import { UsersService } from './users.service';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientsRepository: Repository<Client>,
    private usersService: UsersService,
  ) {}

  async create(clientData: CreateClientDto, userData: CreateUserDto) {
    const newUser = await this.usersService.create(userData);
    const newClient = this.clientsRepository.create({
      ...clientData,
      user: newUser,
    });
    return this.clientsRepository.save(newClient);
  }

  async findOne(id: string) {
    const client = await this.clientsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!client) {
      throw new NotFoundException(`Cliente ${id} no encontrado`);
    }
    return client;
  }

  async update(
    id: string,
    clientChanges: CreateClientDto,
    userChanges: CreateUserDto,
  ) {
    const client = await this.clientsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!client) {
      throw new NotFoundException(`Cliente ${id} no encontrado`);
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
