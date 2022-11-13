import {
  Body,
  Controller,
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
      message: 'Billetera creada exitosamente',
      data: await this.walletsService.create(walletPayload),
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Req() req: any, @Body() changes: any) {
    return {
      statusCode: HttpStatus.OK,
      message: `Billetera ${req?.params?.id} actualizada exitosamente`,
      data: await this.walletsService.update(req?.params?.id, changes),
    };
  }
}
