import {
  Injectable,
  Inject,
  CACHE_MANAGER,
  ForbiddenException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
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
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
    const cacheToken = await this.cacheManager.get(`user_${user?.id}`);
    if (cacheToken) {
      throw new ForbiddenException(
        'Ya existe un token para recuperación de contraseña actualmente',
      );
    }
    const token = this.jwtService.sign(
      {
        id: user?.id,
        role: user?.role,
      },
      { expiresIn: '5m' },
    );
    await this.cacheManager.set(`user_${user?.id}`, token, { ttl: 60 * 5 });
    await this.mailService.sendMail(
      user?.email,
      '[LIBROOKS]: Recuperación de contraseña',
      `Ingresa al siguiente enlace para recuperar tu contraseña: http://localhost:3001/password-reset?token=${token}`,
      false,
    );
    return true;
  }

  async validatePasswordResetToken(token: string) {
    const { id } = this.jwtService.verify(token, {
      ignoreExpiration: true,
    });
    const cacheToken = await this.cacheManager.get(`user_${id}`);
    if (!cacheToken) {
      throw new ForbiddenException(
        `El token de recuperación de contraseña ha expirado`,
      );
    }
    return true;
  }

  async resetPassword(token: string, password: string) {
    const { id } = this.jwtService.verify(token);
    const cacheToken = await this.cacheManager.get(`user_${id}`);
    if (!cacheToken) {
      throw new ForbiddenException(
        `El token de recuperación de contraseña ha expirado`,
      );
    }
    await this.usersService.update(id, { password });
    await this.cacheManager.del(`user_${id}`);
    return true;
  }
}
