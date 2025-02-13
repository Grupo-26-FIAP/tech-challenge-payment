import { CheckoutRepository } from '@Domain/repositories/checkout.repository';
import { CheckoutOrderService } from '@Domain/services/checkout.service.impl';
import { Test, TestingModule } from '@nestjs/testing';
import { CHECKOUT_ORDER_ENTITY_MOCK } from '@Test/unit/__mocks__/checkout-order.mock';

describe('CheckoutOrderService', () => {
  let service: CheckoutOrderService;

  const orderId = 123;

  const mockCheckoutRepository = {
    save: jest.fn(() => Promise.resolve(CHECKOUT_ORDER_ENTITY_MOCK)),
    find: jest.fn(() => Promise.resolve(CHECKOUT_ORDER_ENTITY_MOCK)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckoutOrderService,
        {
          provide: CheckoutRepository,
          useValue: mockCheckoutRepository,
        },
      ],
    }).compile();

    service = module.get<CheckoutOrderService>(CheckoutOrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('save', () => {
    it('should save and return the checkout order', async () => {
      const result = await service.save(CHECKOUT_ORDER_ENTITY_MOCK);

      expect(result).toEqual(CHECKOUT_ORDER_ENTITY_MOCK);
      expect(mockCheckoutRepository.save).toHaveBeenCalledTimes(1);
      expect(mockCheckoutRepository.save).toHaveBeenCalledWith(
        CHECKOUT_ORDER_ENTITY_MOCK,
      );
    });
  });

  describe('find', () => {
    it('should return the checkout order for a given order id', async () => {
      const result = await service.find(orderId);

      expect(result).toEqual(CHECKOUT_ORDER_ENTITY_MOCK);
      expect(mockCheckoutRepository.find).toHaveBeenCalledTimes(1);
      expect(mockCheckoutRepository.find).toHaveBeenCalledWith(orderId);
    });
  });
});
