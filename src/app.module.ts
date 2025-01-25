import { CheckoutUseCase } from '@Application/use-cases/payment/checkout.use-case';
import { PaymentNotificationUseCase } from '@Application/use-cases/payment/payment-notification.use-case';
import { CheckoutRepository } from '@Domain/repositories/checkout.repository';
import { CheckoutOrderService } from '@Domain/services/checkout.service.impl';
import { IPaymentService } from '@Domain/services/payment.service';
import { ConsumerModule } from '@Infrastructure/queue/consumer/consumer.module';
import { ProducerModule } from '@Infrastructure/queue/producer/producer.module';
import { MercadoPagoServiceImpl } from '@Infrastructure/services/mercadopago/mercadopago.service.impl';
import { MongoConfigService } from '@Infrastructure/typeorm/config/mongo.config.service';
import { CheckoutOrder } from '@Infrastructure/typeorm/models/checkout.model';
import { EnvironmentVariableModule } from '@Shared/config/environment-variable/environment-variable.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './presentation/controllers/payment.controller';

@Module({
  imports: [
    HttpModule,
    EnvironmentVariableModule.forRoot({ isGlobal: true }),
    TerminusModule,
    TypeOrmModule.forRootAsync({
      useClass: MongoConfigService,
      inject: [MongoConfigService],
    }),
    TypeOrmModule.forFeature([CheckoutOrder]),
    ProducerModule,
    ConsumerModule,
  ],
  controllers: [PaymentController],
  providers: [
    PaymentNotificationUseCase,
    CheckoutUseCase,
    {
      provide: IPaymentService,
      useClass: MercadoPagoServiceImpl,
    },
    CheckoutOrderService,
    CheckoutRepository,
  ],
})
export class AppModule {}
