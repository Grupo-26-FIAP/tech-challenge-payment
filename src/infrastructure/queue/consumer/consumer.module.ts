import { CheckoutUseCase } from '@Application/use-cases/payment/checkout.use-case';
import { CheckoutRepository } from '@Domain/repositories/checkout.repository';
import { CheckoutOrderService } from '@Domain/services/checkout.service.impl';
import { IPaymentService } from '@Domain/services/payment.service';
import { MercadoPagoServiceImpl } from '@Infrastructure/services/mercadopago/mercadopago.service.impl';
import { MongoConfigService } from '@Infrastructure/typeorm/config/mongo.config.service';
import { CheckoutOrder } from '@Infrastructure/typeorm/models/checkout.model';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqsModule } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { config } from 'dotenv';
import { MessageHandler } from './message.handler';
config();

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  sessionToken: process.env.SESSION_TOKEN,
});

console.log({ ORDER_QUEUE_URL: process.env.ORDER_QUEUE_URL });
console.log({ ORDER_QUEUE_NAME: process.env.ORDER_QUEUE_NAME });

@Module({
  imports: [
    HttpModule,
    SqsModule.register({
      consumers: [
        {
          name: process.env.ORDER_QUEUE_NAME,
          queueUrl: process.env.ORDER_QUEUE_URL,
          region: process.env.AWS_REGION,
        },
      ],
      producers: [],
    }),
    TypeOrmModule.forRootAsync({
      useClass: MongoConfigService,
      inject: [MongoConfigService],
    }),
    TypeOrmModule.forFeature([CheckoutOrder]),
  ],
  controllers: [],
  providers: [
    CheckoutUseCase,
    {
      provide: IPaymentService,
      useClass: MercadoPagoServiceImpl,
    },
    CheckoutOrderService,
    CheckoutRepository,
    MessageHandler,
  ],
})
export class ConsumerModule {}
