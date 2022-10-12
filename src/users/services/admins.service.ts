import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../entities/admin.entity';
import { Repository } from 'typeorm';
import { CreateAdminDto } from '../dtos/admins.dtos';
import { CreateUserDto } from '../dtos/users.dtos';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin) private adminsRepository: Repository<Admin>,
  ) {}

  create(data: CreateAdminDto) {
    const newAdmin = this.adminsRepository.create(data);
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
    const admins = await this.adminsRepository.find();
    return admins;
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
