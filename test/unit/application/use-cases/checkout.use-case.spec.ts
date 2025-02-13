import { PaymentMapper } from '@Application/mappers/payment.mapper';
import { CheckoutUseCase } from '@Application/use-cases/payment/checkout.use-case';
import { CheckoutOrderService } from '@Domain/services/checkout.service.impl';
import { IPaymentService } from '@Domain/services/payment.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ORDER_RESPONSE_DTO_MOCK } from '@Test/unit/__mocks__/order.mock';
import { PAYMENT_REQUEST_DTO_MOCK } from '@Test/unit/__mocks__/payment.mock';

jest.mock('@Application/mappers/payment.mapper', () => ({
  PaymentMapper: { ToPaymentRequestDto: jest.fn() },
}));

describe('CheckoutUseCase', () => {
  let useCase: CheckoutUseCase;

  const mockPaymentMapper: jest.Mock =
    PaymentMapper.ToPaymentRequestDto as jest.Mock;

  const mockPaymentService = {
    createPayment: jest.fn(),
    getNotificationUrl: jest.fn(),
  };

  const mockCheckoutOrderService = { save: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckoutUseCase,
        {
          provide: IPaymentService,
          useValue: mockPaymentService,
        },
        {
          provide: CheckoutOrderService,
          useValue: mockCheckoutOrderService,
        },
      ],
    }).compile();

    useCase = module.get<CheckoutUseCase>(CheckoutUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should execute the checkout process successfully', async () => {
      const notificationUrl = 'https://notification-url.com';
      mockPaymentService.getNotificationUrl.mockReturnValueOnce(
        notificationUrl,
      );

      mockPaymentMapper.mockReturnValueOnce(PAYMENT_REQUEST_DTO_MOCK);

      const checkoutResponse = {
        in_store_order_id: 'store-456',
        qr_data: 'qr-code-xyz',
      };
      mockPaymentService.createPayment.mockResolvedValueOnce(checkoutResponse);

      const result = await useCase.execute(ORDER_RESPONSE_DTO_MOCK);

      expect(result).toEqual(checkoutResponse);

      expect(mockPaymentService.getNotificationUrl).toHaveBeenCalledTimes(1);

      expect(mockPaymentMapper).toHaveBeenCalledTimes(1);
      expect(mockPaymentMapper).toHaveBeenCalledWith(
        ORDER_RESPONSE_DTO_MOCK,
        notificationUrl,
      );

      expect(mockPaymentService.createPayment).toHaveBeenCalledTimes(1);
      expect(mockPaymentService.createPayment).toHaveBeenCalledWith(
        PAYMENT_REQUEST_DTO_MOCK,
      );

      expect(mockCheckoutOrderService.save).toHaveBeenCalledTimes(1);
      expect(mockCheckoutOrderService.save).toHaveBeenCalledWith({
        in_store_order_id: checkoutResponse.in_store_order_id,
        qr_data: checkoutResponse.qr_data,
        order_id: ORDER_RESPONSE_DTO_MOCK.id,
      });
    });
  });
});
