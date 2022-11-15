import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ReturnsService } from '../services/returns.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';
import { UpdateReturnDto } from '../dtos/return.dto';

@Controller('returns')
export class ReturnsController {
  constructor(private readonly returnsService: ReturnsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async findAll() {
    return {
      statusCode: HttpStatus.OK,
      message: `Devoluciones encontradas exitosamente`,
      data: await this.returnsService.findAll(),
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() changes: UpdateReturnDto) {
    return {
      statusCode: HttpStatus.OK,
      message: `Devolución actualizada exitosamente`,
      data: await this.returnsService.update(id, changes),
    };
  }
}
