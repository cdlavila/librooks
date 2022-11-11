import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { WalletsService } from '../services/wallets.service';
import { CreateWalletDto } from '../dtos/wallet.dto';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() walletPayload: CreateWalletDto) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Administrador creado exitosamente',
      data: await this.walletsService.create(walletPayload),
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async find(@Req() req: any) {
    return {
      statusCode: HttpStatus.OK,
      message: `Billetera ${req?.wallet?.id} encontrada exitosamente`,
      data: await this.walletsService.findOne(req?.wallet?.id),
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Req() req: any, @Body() changes: any) {
    return {
      statusCode: HttpStatus.OK,
      message: `Billetera ${req?.wallet?.id} actualizada exitosamente`,
      data: await this.walletsService.update(req?.wallet?.id, changes),
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Req() req: any) {
    return {
      statusCode: HttpStatus.OK,
      message: `Billetera ${req?.wallet?.id} eliminada exitosamente`,
      data: await this.walletsService.delete(req?.wallet?.id),
    };
  }
}
