import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../entities/admin.entity';
import { CreateAdminDto } from '../dtos/admins.dtos';
import { CreateUserDto } from '../dtos/users.dtos';
import { UsersService } from './users.service';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin) private adminsRepository: Repository<Admin>,
    private usersService: UsersService,
  ) {}

  async create(userData: CreateUserDto, adminData: CreateAdminDto) {
    const newUser = await this.usersService.create(userData);
    const newAdmin = this.adminsRepository.create({
      ...adminData,
      user: newUser,
    });
    return this.adminsRepository.save(newAdmin);
  }

  async findOne(id: string) {
    const admin = await this.adminsRepository.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException(`Administrador ${id} no encontrado`);
    }
    return admin;
  }

  async find() {
    return this.adminsRepository.find();
  }

  async update(id: string, changes: CreateAdminDto) {
    const admin = await this.adminsRepository.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException(`Administrador ${id} no encontrado`);
    }
    this.adminsRepository.merge(admin, changes);
    return this.adminsRepository.save(admin);
  }

  async delete(id: string) {
    const admin = await this.adminsRepository.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException(`Administrador ${id} no encontrado`);
    }
    return this.adminsRepository.delete(id);
  }
}
