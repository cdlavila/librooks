import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../entities/admin.entity';
import { CreateAdminDto, UpdateAdminDto } from '../dtos/admins.dto';
import { CreateUserWithoutPasswordDto, UpdateUserDto } from '../dtos/users.dto';
import { UsersService } from './users.service';
import { MailService } from '../../mail/services/mail.service';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin) private adminsRepository: Repository<Admin>,
    private usersService: UsersService,
    private mailService: MailService,
  ) {}

  private calculateAge(dateOfBirth: Date): number {
    const diff = Date.now() - dateOfBirth.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  private generatePassword(): string {
    const length = 10;
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let retVal = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  async create(
    adminData: CreateAdminDto,
    userData: CreateUserWithoutPasswordDto,
  ) {
    const age = this.calculateAge(adminData.dateOfBirth);
    if (age < 18) {
      throw new BadRequestException([
        `El administrador debe ser mayor de edad`,
      ]);
    }
    const user = await this.usersService.exist(userData?.email);
    if (user) {
      throw new BadRequestException([
        `El correo ${userData?.email} ya está registrado`,
      ]);
    }
    const randomPassword = this.generatePassword();
    const newUser = await this.usersService.create({
      ...userData,
      password: randomPassword,
    });
    const newAdmin = this.adminsRepository.create({
      ...adminData,
      user: newUser,
    });
    await this.mailService.sendMail(
      userData?.email,
      'Bienvenido a Librooks 📚',
      `Hola ${adminData?.firstName} ${adminData?.lastName}, bienvenido a Librooks, ahora eres parte de nuestro equipo de administradores.

Tus credenciales son:
 - Usuario: ${userData?.username}
 - Email: ${userData?.email}
 - Contraseña: ${randomPassword}

Recuerda cambiar tu contraseña si así lo deseas.`,
      false,
    );
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
      throw new NotFoundException([`Administrador ${id} no encontrado`]);
    }
    if (adminChanges?.dateOfBirth) {
      const age = this.calculateAge(adminChanges.dateOfBirth);
      if (age < 18) {
        throw new BadRequestException([
          `El administrador debe ser mayor de edad`,
        ]);
      }
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
