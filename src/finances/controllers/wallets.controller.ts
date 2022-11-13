import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WalletsService } from '../services/wallets.service';
import { CreateWalletDto } from '../dtos/wallet.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Put()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async create(@Body() walletPayload: CreateWalletDto) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Billetera creada exitosamente',
      data: await this.walletsService.create(walletPayload),
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async update(@Req() req: any, @Body() changes: any) {
    return {
      statusCode: HttpStatus.OK,
      message: `Billetera ${req?.params?.id} actualizada exitosamente`,
      data: await this.walletsService.update(req?.params?.id, changes),
    };
  }
}
