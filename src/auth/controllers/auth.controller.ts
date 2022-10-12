import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() payload: LoginDto) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Usuario autenticado exitosamente',
      data: await this.authService.login(payload?.username, payload?.password),
    };
  }
}
