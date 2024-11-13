/* eslint-disable prettier/prettier */
import { Body, Param, Post, Controller } from '@nestjs/common';
import { ElectricityService } from './electricity.service';

@Controller('electricity')
export class ElectricityController {
  constructor(private readonly electricityService: ElectricityService) {}
  @Post('verify') createBill(@Body('amount') amount: number) {
    return this.electricityService.createBill(amount);
  }
  @Post('Vend/:validationRef/pay') payBill(
    @Param('validationRef') validationRef: string,
    @Body('walletId') walletId: string,
  ) {
    return this.electricityService.payBill(validationRef, walletId);
  }
}
