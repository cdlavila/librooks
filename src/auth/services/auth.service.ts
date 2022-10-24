import { Injectable, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../../mail/services/mail.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
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
      ...(user.client && { client: user?.client }),
      ...(user.admin && { admin: user?.admin }),
    });
    return { user, token };
  }

  async validate(userId: string) {
    await this.usersService.findOne(userId);
    return null;
  }

  async refresh(userId: string) {
    const user = await this.usersService.findOne(userId);
    const token = this.jwtService.sign({
      id: user?.id,
      role: user?.role,
      ...(user.client && { client: user?.client }),
      ...(user.admin && { admin: user?.admin }),
    });
    return { user, token };
  }

  async requestPasswordReset(email: string) {
    const user = await this.usersService.findByUsernameOrEmail(email);
    const code = Math.floor(Math.random() * (999999 - 100000) + 100000);
    await this.mailService.sendMail(
      user?.email,
      '[LIBROOKS]: Recuperación de contraseña',
      `Tu código para recuperar tu contraseña es: <h2>${code}</h2>`,
      true,
    );
  }
}
