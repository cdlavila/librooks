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
import { CreateClientDto } from '../dtos/clients.dto';
import { CreateUserDto } from '../dtos/users.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  async findMyself(@Req() req: any) {
    return {
      statusCode: HttpStatus.OK,
      message: `Cliente ${req?.user?.userId} encontrado exitosamente`,
      data: await this.clientsService.findMyself(req?.user?.client?.id),
    };
  }

  @Put('myself')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async updateMyself(
    @Req() req: any,
    @Body() clientPayload: CreateClientDto,
    @Body('user') userPayload: CreateUserDto,
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
  @UseGuards(JwtAuthGuard)
  async delete(@Req() req: any) {
    return this.clientsService.delete(req?.user?.client?.id);
  }
}
