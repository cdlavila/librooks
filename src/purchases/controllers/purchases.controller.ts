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
import { PurchasesService } from '../services/purchases.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';
import { UpdatePurchaseDto } from '../dtos/purchase.dto';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async findAll() {
    return {
      statusCode: HttpStatus.OK,
      message: `Compras encontradas exitosamente`,
      data: await this.purchasesService.findAll(),
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() changes: UpdatePurchaseDto) {
    return {
      statusCode: HttpStatus.OK,
      message: `Compra actualizada exitosamente`,
      data: await this.purchasesService.update(id, changes),
    };
  }
}
