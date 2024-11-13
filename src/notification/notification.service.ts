/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Injectable()
export class NotificationService {
  @EventPattern('bill_created')
  handleBillCreated(data: Record<string, unknown>) {
    console.log('Received bill_created message:', data);
  }

  @EventPattern('payment_completed')
  handlePaymentCompleted(data: Record<string, unknown>) {
    console.log('Received payment_completed message:', data);
  }
}
