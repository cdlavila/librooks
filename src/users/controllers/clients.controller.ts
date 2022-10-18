import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { ClientsService } from '../services/clients.service';
import { CreateClientDto } from '../dtos/clients.dto';
import { CreateUserDto } from '../dtos/users.dto';

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

  @Get(':id')
  async findById(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: `Cliente ${id} encontrado exitosamente`,
      data: await this.clientsService.findOne(id),
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() clientPayload: CreateClientDto,
    @Body('user') userPayload: CreateUserDto,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Cliente actualizado exitosamente',
      data: await this.clientsService.update(id, clientPayload, userPayload),
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.clientsService.delete(id);
  }
}
