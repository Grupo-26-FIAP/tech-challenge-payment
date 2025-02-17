const lastValueFromMock = jest.fn();

import { MercadoPagoServiceImpl } from '@Infrastructure/services/mercadopago/mercadopago.service.impl';
import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentVariableService } from '@Shared/config/environment-variable/environment-variable.service';
import { CHECKOUT_REQUEST_DTO_MOCK } from '@Test/unit/__mocks__/checkout-order.mock';
import { MERCHANT_ORDER_RESPONSE_DTO_MOCK } from '@Test/unit/__mocks__/merchant-order.mock';
import {
  PAYMENT_NOTIFICATION_REQUEST_DTO_MOCK,
  PAYMENT_REQUEST_DTO_MOCK,
} from '@Test/unit/__mocks__/payment.mock';

jest.mock('rxjs', () => {
  return {
    lastValueFrom: lastValueFromMock,
  };
});

describe('MercadoPagoServiceImpl', () => {
  let service: MercadoPagoServiceImpl;

  const mockHttpService = {
    post: jest.fn(),
    get: jest.fn(),
  };

  const mockEnvironmentVariableService = {
    mercadoPagoConfig: {
      paymentUrl: 'https://api.mercadopago.com/v1/payments',
      token: 'mock-token',
      notificationUrl: 'https://api.mercadopago.com/v1/notifications',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MercadoPagoServiceImpl,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
        {
          provide: EnvironmentVariableService,
          useValue: mockEnvironmentVariableService,
        },
      ],
    }).compile();

    service = module.get<MercadoPagoServiceImpl>(MercadoPagoServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createPayment', () => {
    it('should create a payment and return the response', async () => {
      lastValueFromMock.mockResolvedValueOnce({
        data: CHECKOUT_REQUEST_DTO_MOCK,
      });

      const result = await service.createPayment(PAYMENT_REQUEST_DTO_MOCK);

      expect(result).toEqual(CHECKOUT_REQUEST_DTO_MOCK);
      expect(lastValueFromMock).toHaveBeenCalledTimes(1);
      expect(mockHttpService.post).toHaveBeenCalledTimes(1);
      expect(mockHttpService.post).toHaveBeenCalledWith(
        'https://api.mercadopago.com/v1/payments',
        PAYMENT_REQUEST_DTO_MOCK,
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer mock-token',
            ContentType: 'application/json',
          }),
        }),
      );
    });

    it('should handle error if payment creation fails', async () => {
      const mockHandleError = jest
        .spyOn(service as any, 'handleError')
        .mockImplementationOnce(undefined);

      lastValueFromMock.mockRejectedValueOnce(undefined);

      const result = await service.createPayment(PAYMENT_REQUEST_DTO_MOCK);

      expect(result).toEqual(undefined);
      expect(lastValueFromMock).toHaveBeenCalledTimes(1);
      expect(mockHandleError).toHaveBeenCalledTimes(1);
      expect(mockHandleError).toHaveBeenCalledWith(undefined);
    });
  });

  describe('getMerchantOrder', () => {
    it('should get merchant order if topic is "merchant_order"', async () => {
      lastValueFromMock.mockResolvedValueOnce({
        data: MERCHANT_ORDER_RESPONSE_DTO_MOCK,
      });

      const result = await service.getMerchantOrder(
        PAYMENT_NOTIFICATION_REQUEST_DTO_MOCK,
      );

      expect(result).toEqual(MERCHANT_ORDER_RESPONSE_DTO_MOCK);
      expect(lastValueFromMock).toHaveBeenCalledTimes(1);
      expect(mockHttpService.get).toHaveBeenCalledTimes(1);
      expect(mockHttpService.get).toHaveBeenCalledWith(
        PAYMENT_NOTIFICATION_REQUEST_DTO_MOCK.resource,
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer mock-token',
            ContentType: 'application/json',
          }),
        }),
      );
    });

    it('should handle error if getting merchant order fails', async () => {
      const mockHandleError = jest
        .spyOn(service as any, 'handleError')
        .mockImplementationOnce(undefined);

      lastValueFromMock.mockRejectedValueOnce(undefined);

      const result = await service.getMerchantOrder(
        PAYMENT_NOTIFICATION_REQUEST_DTO_MOCK,
      );

      expect(result).toEqual(undefined);
      expect(lastValueFromMock).toHaveBeenCalledTimes(1);
      expect(mockHandleError).toHaveBeenCalledTimes(1);
      expect(mockHandleError).toHaveBeenCalledWith(undefined);
    });
  });

  it('should return the correct notification URL', () => {
    expect(service.getNotificationUrl()).toBe(
      'https://api.mercadopago.com/v1/notifications',
    );
    expect(mockEnvironmentVariableService.mercadoPagoConfig.notificationUrl);
  });

  describe('handleError', () => {
    it('should log the error', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      const error = new Error('Test error');
      service['handleError'](error);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'An error occurred while processing the order:',
        error,
      );

      consoleErrorSpy.mockRestore();
    });
  });
});
