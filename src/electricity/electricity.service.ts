/* eslint-disable prettier/prettier */
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Bill } from './bill.model';
import { WalletService } from 'src/wallet/wallet.service';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CustomError } from '../utils/custom-error';

@Injectable()
export class ElectricityService implements OnModuleDestroy, OnModuleInit {
  private bills: Bill[] = [];
  private client: ClientProxy;

  constructor(
    private readonly walletService: WalletService,
    private readonly configService: ConfigService,
  ) {
    const rabbitMqUrl = this.configService.get<string>('RABBITMQ_URL');

    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [rabbitMqUrl],
        queue: 'message',
        queueOptions: { durable: true },
      },
    });
  }

  async onModuleInit() {
    try {
      await this.client.connect();
      console.log('RabbitMQ connected successfully');
    } catch (error) {
      console.error('Failed to connect to RabbitMQ:', error.message);
      throw new CustomError(500, 'RabbitMQ Connection Error', error.message);
    }
  }

  async createBill(amount: number): Promise<Bill> {
    const bill = new Bill(amount);
    this.bills.push(bill);
    await this.client.send('bill_created', bill);
    console.log('Bill created and sent:', bill);
    return bill;
  }

  async payBill(validationRef: string, walletId: string): Promise<Bill | null> {
    try {
      const bill = this.bills.find((el) => el.id === validationRef);
      if (!bill) {
        throw new CustomError(404, 'The bill ID provided does not exist.');
      }

      if (bill.status !== 'Pending') {
        throw new CustomError(400, 'Bill payment error');
      }

      const wallet = this.walletService.getWalletById(walletId);
      if (!wallet) {
        console.error('Wallet not found');
        throw new CustomError(404, 'The wallet ID provided does not exist.');
      }

      if (wallet.balance < bill.amount) {
        throw new CustomError(400, 'Insufficient funds');
      }

      wallet.balance -= bill.amount;
      bill.status = 'Paid';
      await this.client.send('payment_completed', bill);
      console.log('Payment completed and sent:', bill);
      return bill;
    } catch (error) {
      console.error(error.message);
      throw new CustomError(500, `Payment failed: ${error.message}`);
    }
  }

  async onModuleDestroy() {
    await this.client.close();
  }
}
