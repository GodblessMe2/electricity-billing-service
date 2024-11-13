import { Module } from '@nestjs/common';
import { ElectricityService } from './electricity.service';
import { ElectricityController } from './electricity.controller';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
  imports: [WalletModule],
  providers: [ElectricityService],
  controllers: [ElectricityController],
})
export class ElectricityModule {}
