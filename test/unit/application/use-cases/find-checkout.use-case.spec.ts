import { FindCheckoutUseCase } from '@Application/use-cases/payment/find-checkout.use-case';
import { CheckoutOrderService } from '@Domain/services/checkout.service.impl';
import { Test, TestingModule } from '@nestjs/testing';
import { CHECKOUT_ORDER_ENTITY_MOCK } from '@Test/unit/__mocks__/checkout-order.mock';

describe('FindCheckoutUseCase', () => {
  const orderId = 123;
  let useCase: FindCheckoutUseCase;

  const mockCheckoutOrderService = {
    find: jest.fn(() => Promise.resolve(CHECKOUT_ORDER_ENTITY_MOCK)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindCheckoutUseCase,
        {
          provide: CheckoutOrderService,
          useValue: mockCheckoutOrderService,
        },
      ],
    }).compile();

    useCase = module.get<FindCheckoutUseCase>(FindCheckoutUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return the checkout order for a given order id', async () => {
      const result = await useCase.execute(orderId);

      expect(result).toEqual(CHECKOUT_ORDER_ENTITY_MOCK);
      expect(mockCheckoutOrderService.find).toHaveBeenCalledTimes(1);
      expect(mockCheckoutOrderService.find).toHaveBeenCalledWith(orderId);
    });
  });
});
