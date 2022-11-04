import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create(data: CreateUserDto) {
    const newUser = this.usersRepository.create(data);
    newUser.password = bcrypt.hashSync(newUser?.password, 10);
    return this.usersRepository.save(newUser);
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['admin', 'client'],
    });
    if (!user) {
      throw new NotFoundException(`Usuario ${id} no encontrado`);
    }
    return user;
  }

  async findByUsernameOrEmail(username: string) {
    const user = await this.usersRepository.findOne({
      where: [{ username }, { email: username }],
      relations: ['admin', 'client'],
    });
    if (!user) {
      throw new NotFoundException(`Usuario ${username} no encontrado`);
    }
    return user;
  }

  async update(id: string, changes: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario ${id} no encontrado`);
    }
    this.usersRepository.merge(user, changes);
    if (changes?.password) {
      user.password = bcrypt.hashSync(changes?.password, 10);
    }
    return this.usersRepository.save(user);
  }

  async delete(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario ${id} no encontrado`);
    }
    return this.usersRepository.delete(id);
  }
}
