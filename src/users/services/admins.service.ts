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

  async update(
    id: string,
    userChanges: CreateUserDto,
    adminChanges: CreateAdminDto,
  ) {
    const admin = await this.adminsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!admin) {
      throw new NotFoundException(`Administrador ${id} no encontrado`);
    }
    const user = await this.usersService.update(admin?.user?.id, userChanges);
    this.adminsRepository.merge(admin, adminChanges);
    return this.adminsRepository.save({ ...admin, user });
  }

  async delete(id: string) {
    const admin = await this.adminsRepository.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException(`Administrador ${id} no encontrado`);
    }
    return this.adminsRepository.delete(id);
  }
}
