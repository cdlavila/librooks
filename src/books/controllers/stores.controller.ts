import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';
import { CreateStoreDto, UpdateStoreDto } from '../dtos/store.dto';
import { StoresService } from '../services/stores.service';

@Controller('stores')
export class StoresController {
  constructor(private readonly storeService: StoresService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async create(@Body() storePayload: CreateStoreDto) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Tienda creada exitosamente',
      data: await this.storeService.create(storePayload),
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Client)
  async findAll() {
    return {
      statusCode: HttpStatus.OK,
      message: `Tiendas encontradas exitosamente`,
      data: await this.storeService.findAll(),
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Client)
  async findById(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: `Tienda ${id} encontrada exitosamente`,
      data: await this.storeService.findOne(id),
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() changes: UpdateStoreDto) {
    return {
      statusCode: HttpStatus.OK,
      message: `Tienda ${id} actualizada exitosamente`,
      data: await this.storeService.update(id, changes),
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async delete(@Param('id') id: string) {
    return this.storeService.delete(id);
  }
}
