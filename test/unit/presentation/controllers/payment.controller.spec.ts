import { FindCheckoutUseCase } from '@Application/use-cases/payment/find-checkout.use-case';
import { PaymentNotificationUseCase } from '@Application/use-cases/payment/payment-notification.use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from '@Presentation/controllers/payment.controller';
import { CHECKOUT_ORDER_ENTITY_MOCK } from '@Test/unit/__mocks__/checkout-order.mock';
import { PAYMENT_NOTIFICATION_REQUEST_DTO_MOCK } from '@Test/unit/__mocks__/payment.mock';

describe('PaymentController', () => {
  let controller: PaymentController;

  const mockFindCheckoutUseCase = {
    execute: jest.fn(() => Promise.resolve(CHECKOUT_ORDER_ENTITY_MOCK)),
  };

  const mockPaymentNotificationUseCase = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: FindCheckoutUseCase,
          useValue: mockFindCheckoutUseCase,
        },
        {
          provide: PaymentNotificationUseCase,
          useValue: mockPaymentNotificationUseCase,
        },
      ],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('checkout', () => {
    it('should return a checkout order for a given orderId', async () => {
      const orderId = 1;
      const result = await controller.checkout(orderId);

      expect(result).toEqual(CHECKOUT_ORDER_ENTITY_MOCK);
      expect(mockFindCheckoutUseCase.execute).toHaveBeenCalledTimes(1);
      expect(mockFindCheckoutUseCase.execute).toHaveBeenCalledWith(orderId);
    });
  });

  describe('create', () => {
    it('should call paymentNotificationUseCase.execute with the correct dto', async () => {
      await controller.create(PAYMENT_NOTIFICATION_REQUEST_DTO_MOCK);

      expect(mockPaymentNotificationUseCase.execute).toHaveBeenCalledTimes(1);
      expect(mockPaymentNotificationUseCase.execute).toHaveBeenCalledWith(
        PAYMENT_NOTIFICATION_REQUEST_DTO_MOCK,
      );
    });
  });
});
