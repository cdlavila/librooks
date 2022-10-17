import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AdminsService } from '../services/admins.service';
import { CreateAdminDto } from '../dtos/admins.dtos';
import { CreateUserDto } from '../dtos/users.dtos';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() userPayload: CreateUserDto,
    @Body() adminPayload: CreateAdminDto,
  ) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Administrador creado exitosamente',
      data: await this.adminsService.create(userPayload, adminPayload),
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: `Administrador ${id} encontrado existosamente`,
      data: await this.adminsService.findOne(id),
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return {
      statusCode: HttpStatus.OK,
      message: `Administradores encontrados exitosamente`,
      data: await this.adminsService.find(),
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() payload: CreateAdminDto) {
    return {
      statusCode: HttpStatus.OK,
      message: `Administrador ${id} actualizado exitosamente`,
      data: await this.adminsService.update(id, payload),
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.adminsService.delete(id);
  }
}
