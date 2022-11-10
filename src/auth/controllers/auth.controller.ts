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
import { LoginDto } from '../dtos/login.dto';
import {
  RequestPasswordResetDto,
  ValidatePasswordResetTokenDto,
  ResetPasswordDto,
} from '../dtos/password.reset.dto';
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

  @Post('request-password-reset')
  @HttpCode(HttpStatus.OK)
  async requestPasswordReset(@Body() payload: RequestPasswordResetDto) {
    return {
      statusCode: HttpStatus.OK,
      message: 'El correo con las instrucciones fue enviado exitosamente',
      data: await this.authService.requestPasswordReset(payload?.email),
    };
  }

  @Post('validate-password-reset-token')
  @HttpCode(HttpStatus.OK)
  async validatePasswordResetToken(
    @Body() payload: ValidatePasswordResetTokenDto,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Token para recuperación de contraseña validado exitosamente',
      data: await this.authService.validatePasswordResetToken(payload?.token),
    };
  }

  @Post('password-reset')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() payload: ResetPasswordDto) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Contraseña actualizada exitosamente',
      data: await this.authService.resetPassword(
        payload?.token,
        payload?.password,
      ),
    };
  }
}
