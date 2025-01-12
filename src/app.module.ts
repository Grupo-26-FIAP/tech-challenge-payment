import { CheckoutUseCase } from '@Application/use-cases/payment/checkout.use-case';
import { WebhookUseCase } from '@Application/use-cases/payment/webhook.use-case';
import { MercadoPagoServiceImpl } from '@Infrastructure/services/mercadopago/mercadopago.service.impl';
import { IPaymentService } from '@Infrastructure/services/mercadopago/payment.service';
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
  ],
  controllers: [PaymentController],
  providers: [
    WebhookUseCase,
    CheckoutUseCase,
    {
      provide: IPaymentService,
      useClass: MercadoPagoServiceImpl,
    },
  ],
})
export class AppModule {}
