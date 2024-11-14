/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class NotificationService {
  @MessagePattern('bill_created')
  handleBillCreated(data: Record<string, unknown>) {
    console.log('Received bill_created message:', data);
  }

  @MessagePattern('payment_completed')
  handlePaymentCompleted(data: Record<string, unknown>) {
    console.log('Received payment_completed message:', data);
  }
}
