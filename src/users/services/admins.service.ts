import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../entities/admin.entity';
import { CreateAdminDto, UpdateAdminDto } from '../dtos/admins.dto';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { UsersService } from './users.service';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin) private adminsRepository: Repository<Admin>,
    private usersService: UsersService,
  ) {}

  async create(adminData: CreateAdminDto, userData: CreateUserDto) {
    const user = await this.usersService.exist(userData?.email);
    if (user) {
      throw new BadRequestException([
        `El correo ${userData?.email} ya está registrado`,
      ]);
    }
    const newUser = await this.usersService.create(userData);
    const newAdmin = this.adminsRepository.create({
      ...adminData,
      user: newUser,
    });
    return this.adminsRepository.save(newAdmin);
  }

  async findOne(id: string) {
    const admin = await this.adminsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!admin) {
      throw new NotFoundException(`Administrador ${id} no encontrado`);
    }
    return admin;
  }

  async findAll() {
    return this.adminsRepository.find({
      relations: ['user'],
    });
  }

  async update(
    id: string,
    adminChanges: UpdateAdminDto,
    userChanges: UpdateUserDto,
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
    const admin = await this.adminsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!admin) {
      throw new NotFoundException(`Administrador ${id} no encontrado`);
    }
    return this.usersService.delete(admin?.user?.id);
  }
}
