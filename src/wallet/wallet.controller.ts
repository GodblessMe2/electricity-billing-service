/* eslint-disable prettier/prettier */
import { Body, Param, Post, Get, Put, Controller } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('create') createWallet() {
    return this.walletService.createWallet();
  }

  @Put(':id/add-funds') addFunds(
    @Param('id') id: string,
    @Body('amount') amount: number,
  ) {
    return this.walletService.addFund(id, amount);
  }

  @Get('getWallet/:id')
  getWalletById(@Param('id') id: string) {
    return this.walletService.getWalletById(id);
  }
}
