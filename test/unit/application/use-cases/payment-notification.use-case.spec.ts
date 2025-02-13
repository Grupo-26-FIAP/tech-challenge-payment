import { PaymentNotificationUseCase } from '@Application/use-cases/payment/payment-notification.use-case';
import { IPaymentService } from '@Domain/services/payment.service';
import { MessageProducer } from '@Infrastructure/queue/producer/producer.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentStatusType } from '@Shared/enums/payment-status-type.enum';
import { MERCHANT_ORDER_RESPONSE_DTO_MOCK } from '@Test/unit/__mocks__/merchant-order.mock';
import { PAYMENT_NOTIFICATION_REQUEST_DTO_MOCK } from '@Test/unit/__mocks__/payment.mock';

describe('PaymentNotificationUseCase', () => {
  let useCase: PaymentNotificationUseCase;

  const mockPaymentService = { getMerchantOrder: jest.fn() };

  const mockMessageProducer = { sendMessage: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentNotificationUseCase,
        {
          provide: IPaymentService,
          useValue: mockPaymentService,
        },
        {
          provide: MessageProducer,
          useValue: mockMessageProducer,
        },
      ],
    }).compile();

    useCase = module.get<PaymentNotificationUseCase>(
      PaymentNotificationUseCase,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should call validatePayment successfully', async () => {
      const mockValidatePayment = jest
        .spyOn(useCase as any, 'validatePayment')
        .mockResolvedValueOnce(Promise.resolve());

      const mockHandleError = jest
        .spyOn(useCase as any, 'handleError')
        .mockReturnValueOnce(undefined);

      await useCase.execute(PAYMENT_NOTIFICATION_REQUEST_DTO_MOCK);

      expect(mockValidatePayment).toHaveBeenCalledTimes(1);
      expect(mockValidatePayment).toHaveBeenCalledWith(
        PAYMENT_NOTIFICATION_REQUEST_DTO_MOCK,
      );

      expect(mockHandleError).not.toHaveBeenCalled();
    });

    it('should call handleError if validatePayment handle an error', async () => {
      const error = new Error('error-message');

      const mockValidatePayment = jest
        .spyOn(useCase as any, 'validatePayment')
        .mockRejectedValueOnce(error);

      const mockHandleError = jest
        .spyOn(useCase as any, 'handleError')
        .mockReturnValueOnce(undefined);

      await useCase.execute(PAYMENT_NOTIFICATION_REQUEST_DTO_MOCK);

      expect(mockValidatePayment).toHaveBeenCalledTimes(1);
      expect(mockValidatePayment).toHaveBeenCalledWith(
        PAYMENT_NOTIFICATION_REQUEST_DTO_MOCK,
      );

      expect(mockHandleError).toHaveBeenCalledTimes(1);
      expect(mockHandleError).toHaveBeenCalledWith(error);
    });
  });

  describe('validatePayment', () => {
    it('should send a message when payment is approved', async () => {
      mockPaymentService.getMerchantOrder.mockResolvedValueOnce(
        MERCHANT_ORDER_RESPONSE_DTO_MOCK,
      );

      await useCase['validatePayment'](PAYMENT_NOTIFICATION_REQUEST_DTO_MOCK);

      expect(mockPaymentService.getMerchantOrder).toHaveBeenCalledTimes(1);
      expect(mockPaymentService.getMerchantOrder).toHaveBeenCalledWith(
        PAYMENT_NOTIFICATION_REQUEST_DTO_MOCK,
      );

      expect(mockMessageProducer.sendMessage).toHaveBeenCalledTimes(1);
      expect(mockMessageProducer.sendMessage).toHaveBeenCalledWith(
        'payment-status-updated-queue.fifo',
        {
          orderId: MERCHANT_ORDER_RESPONSE_DTO_MOCK.external_reference,
          status: PaymentStatusType.APPROVED,
        },
      );
    });

    it('should not send a message when payment is not approved', async () => {
      const merchantOrderPendingPayment = structuredClone(
        MERCHANT_ORDER_RESPONSE_DTO_MOCK,
      );
      merchantOrderPendingPayment.status = 'pending';
      merchantOrderPendingPayment.order_status = 'in_progress';

      mockPaymentService.getMerchantOrder.mockResolvedValueOnce(
        merchantOrderPendingPayment,
      );

      await useCase.execute(PAYMENT_NOTIFICATION_REQUEST_DTO_MOCK);

      expect(mockPaymentService.getMerchantOrder).toHaveBeenCalledTimes(1);
      expect(mockMessageProducer.sendMessage).not.toHaveBeenCalled();
    });
  });

  describe('handleError', () => {
    it('should log the error', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      const error = new Error('Test error');
      useCase['handleError'](error);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'An error occurred while processing the order:',
        error,
      );

      consoleErrorSpy.mockRestore();
    });
  });
});
