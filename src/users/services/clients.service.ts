import { Injectable } from '@nestjs/common';
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
}
