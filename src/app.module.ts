import { CheckoutUseCase } from '@Application/use-cases/payment/checkout.use-case';
import { FindCheckoutUseCase } from '@Application/use-cases/payment/find-checkout.use-case';
import { PaymentNotificationUseCase } from '@Application/use-cases/payment/payment-notification.use-case';
import { CheckoutRepository } from '@Domain/repositories/checkout.repository';
import { CheckoutOrderService } from '@Domain/services/checkout.service.impl';
import { IPaymentService } from '@Domain/services/payment.service';
import { ConsumerModule } from '@Infrastructure/queue/consumer/consumer.module';
import { ProducerModule } from '@Infrastructure/queue/producer/producer.module';
import { MercadoPagoServiceImpl } from '@Infrastructure/services/mercadopago/mercadopago.service.impl';
import { MongoConfigService } from '@Infrastructure/typeorm/config/mongo.config.service';
import { CheckoutOrder } from '@Infrastructure/typeorm/models/checkout.model';
import { HealthController } from '@Presentation/controllers/health.controller';
import { EnvironmentVariableModule } from '@Shared/config/environment-variable/environment-variable.module';
import { ResponseMiddleware } from '@Shared/middlewares/response.middleware';
import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
  controllers: [HealthController, PaymentController],
  providers: [
    PaymentNotificationUseCase,
    CheckoutUseCase,
    FindCheckoutUseCase,
    {
      provide: IPaymentService,
      useClass: MercadoPagoServiceImpl,
    },
    CheckoutOrderService,
    CheckoutRepository,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseMiddleware).forRoutes('*'); // Apply the middleware to all routes
  }
}
