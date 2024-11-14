/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const rabbitMqUrl = configService.get<string>('RABBITMQ_URL');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitMqUrl],
      queue: 'message',
      queueOptions: { durable: true },
      prefetchCount: 1,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
  console.log('HTTP Server is running on http://localhost:3000');
  console.log('RabbitMQ Subscriber Service is listening...');
}

bootstrap();
