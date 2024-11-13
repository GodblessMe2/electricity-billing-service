/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ElectricityModule } from './electricity/electricity.module';
import { WalletModule } from './wallet/wallet.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ElectricityModule,
    WalletModule,
    NotificationModule,
  ],
})
export class AppModule {}
