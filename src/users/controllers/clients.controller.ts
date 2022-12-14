import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Get,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ClientsService } from '../services/clients.service';
import { CreateClientDto, UpdateClientDto } from '../dtos/clients.dto';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() clientPayload: CreateClientDto,
    @Body('user') userPayload: CreateUserDto,
  ) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Cliente creado exitosamente',
      data: await this.clientsService.create(clientPayload, userPayload),
    };
  }

  @Get('myself')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Client)
  async findMyself(@Req() req: any) {
    return {
      statusCode: HttpStatus.OK,
      message: `Cliente ${req?.user?.userId} encontrado exitosamente`,
      data: await this.clientsService.findMyself(req?.user?.client?.id),
    };
  }

  @Get('wallet')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Client)
  async findMyWallet(@Req() req: any) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Billetera encontrada exitosamente',
      data: await this.clientsService.findMyWallet(req?.user?.client?.id),
    };
  }

  @Get('payment-cards')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Client)
  async findMyPaymentCards(@Req() req: any) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Tarjetas de pago encontradas exitosamente',
      data: await this.clientsService.findMyPaymentCards(req?.user?.client?.id),
    };
  }

  @Get('purchases')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Client)
  async findMyPurchases(@Req() req: any) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Compras encontradas exitosamente',
      data: await this.clientsService.findMyPurchases(req?.user?.client?.id),
    };
  }

  @Get('bookings')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Client)
  async findMyBookings(@Req() req: any) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Reservas encontradas exitosamente',
      data: await this.clientsService.findMyBookings(req?.user?.client?.id),
    };
  }

  @Get('returns')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Client)
  async findMyPurchasesWithReturns(@Req() req: any) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Compras con devoluciones encontradas exitosamente',
      data: await this.clientsService.findMyPurchasesWithReturns(
        req?.user?.client?.id,
      ),
    };
  }

  @Put('myself')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Client)
  async updateMyself(
    @Req() req: any,
    @Body() clientPayload: UpdateClientDto,
    @Body('user') userPayload: UpdateUserDto,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Cliente actualizado exitosamente',
      data: await this.clientsService.updateMyself(
        req?.user?.client?.id,
        clientPayload,
        userPayload,
      ),
    };
  }

  @Delete('myself')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Client)
  async delete(@Req() req: any) {
    return this.clientsService.delete(req?.user?.client?.id);
  }
}
