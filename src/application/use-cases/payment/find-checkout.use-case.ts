import { CheckoutOrderService } from '@Domain/services/checkout.service.impl';
import { CheckoutOrder } from '@Infrastructure/typeorm/models/checkout.model';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindCheckoutUseCase {
  constructor(
    @Inject(CheckoutOrderService)
    private readonly checkoutOrderService: CheckoutOrderService,
  ) {}

  async execute(orderId: number): Promise<CheckoutOrder> {
    return await this.checkoutOrderService.find(orderId);
  }
}
