import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
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
}
