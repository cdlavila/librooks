import {
  Req,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dtos';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

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

  @Get('validate')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async validate(@Req() req: any) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Token validado exitosamente',
      data: await this.authService.validate(req?.userId),
    };
  }

  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async refresh(@Req() req: any) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Usuario autenticado exitosamente',
      data: await this.authService.refresh(req?.user.userId),
    };
  }
}
