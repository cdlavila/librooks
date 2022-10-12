import { Injectable, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.usersService.findByUsernameOrEmail(username);
    const isMatch: boolean = bcrypt.compareSync(password, user?.password);
    if (!isMatch) {
      throw new ForbiddenException(
        `Las datos de inicio de sesión no coinciden`,
      );
    }
    const token = this.jwtService.sign({
      id: user?.id,
      role: user?.role,
    });
    return { user, token };
  }
}
