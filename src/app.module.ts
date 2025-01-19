import { CheckoutUseCase } from '@Application/use-cases/payment/checkout.use-case';
import { PaymentNotificationUseCase } from '@Application/use-cases/payment/payment-notification.use-case';
import { IPaymentService } from '@Domain/services/payment.service';
import { MercadoPagoServiceImpl } from '@Infrastructure/services/mercadopago/mercadopago.service.impl';
import { EnvironmentVariableModule } from '@Shared/config/environment-variable/environment-variable.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { PaymentController } from './presentation/controllers/payment.controller';

@Module({
  imports: [
    HttpModule,
    EnvironmentVariableModule.forRoot({ isGlobal: true }),
    TerminusModule,
    // ProducerModule,
    // ConsumerModule,
  ],
  controllers: [PaymentController],
  providers: [
    PaymentNotificationUseCase,
    CheckoutUseCase,
    {
      provide: IPaymentService,
      useClass: MercadoPagoServiceImpl,
    },
  ],
})
export class AppModule {}
