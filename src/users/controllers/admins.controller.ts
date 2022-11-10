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
import { CreateAdminDto, UpdateAdminDto } from '../dtos/admins.dto';
import { CreateUserWithoutPasswordDto, UpdateUserDto } from '../dtos/users.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Root)
  async create(
    @Body() adminPayload: CreateAdminDto,
    @Body('user') userPayload: CreateUserWithoutPasswordDto,
  ) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Administrador creado exitosamente',
      data: await this.adminsService.create(adminPayload, userPayload),
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Root)
  async findAll() {
    return {
      statusCode: HttpStatus.OK,
      message: `Administradores encontrados exitosamente`,
      data: await this.adminsService.findAll(),
    };
  }

  @Get('myself')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async findMyself(@Req() req: any) {
    return {
      statusCode: HttpStatus.OK,
      message: `Administrador ${req?.user?.admin?.id} encontrado exitosamente`,
      data: await this.adminsService.findOne(req?.user?.admin?.id),
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Root)
  async findById(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: `Administrador ${id} encontrado exitosamente`,
      data: await this.adminsService.findOne(id),
    };
  }

  @Put('myself')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async updateMyself(
    @Req() req: any,
    @Body() adminPayload: UpdateAdminDto,
    @Body('user') userPayload: UpdateUserDto,
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Root)
  async update(
    @Param('id') id: string,
    @Body() adminPayload: UpdateAdminDto,
    @Body('user') userPayload: UpdateUserDto,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: `Administrador ${id} actualizado exitosamente`,
      data: await this.adminsService.update(id, adminPayload, userPayload),
    };
  }

  @Delete('myself')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  async deleteMyself(@Req() req: any) {
    return this.adminsService.delete(req?.user?.admin?.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Root)
  async delete(@Param('id') id: string) {
    return this.adminsService.delete(id);
  }
}
