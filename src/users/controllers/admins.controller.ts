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
  UseGuards,
  Req,
} from '@nestjs/common';
import { AdminsService } from '../services/admins.service';
import { CreateAdminDto } from '../dtos/admins.dto';
import { CreateUserDto } from '../dtos/users.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() adminPayload: CreateAdminDto,
    @Body('user') userPayload: CreateUserDto,
  ) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Administrador creado exitosamente',
      data: await this.adminsService.create(adminPayload, userPayload),
    };
  }

  @Get('myself')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async findMyself(@Req() req: any) {
    return {
      statusCode: HttpStatus.OK,
      message: `Administrador ${req?.user?.admin?.id} encontrado existosamente`,
      data: await this.adminsService.findOne(req?.user?.admin?.id),
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
      data: await this.adminsService.findAll(),
    };
  }

  @Put('myself')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async updateMyself(
    @Req() req: any,
    @Body() adminPayload: CreateAdminDto,
    @Body('user') userPayload: CreateUserDto,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: `Administrador ${req?.user?.admin?.id} actualizado exitosamente`,
      data: await this.adminsService.update(
        req?.user?.admin?.id,
        adminPayload,
        userPayload,
      ),
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() adminPayload: CreateAdminDto,
    @Body('user') userPayload: CreateUserDto,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: `Administrador ${id} actualizado exitosamente`,
      data: await this.adminsService.update(id, adminPayload, userPayload),
    };
  }

  @Delete('myself')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async deleteMyself(@Req() req: any) {
    return this.adminsService.delete(req?.user?.admin?.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.adminsService.delete(id);
  }
}
