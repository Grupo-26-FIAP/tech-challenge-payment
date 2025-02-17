import { CheckoutRepository } from '@Domain/repositories/checkout.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { CHECKOUT_ORDER_ENTITY_MOCK } from '@Test/unit/__mocks__/checkout-order.mock';

describe('CheckoutRepository', () => {
  let repository: CheckoutRepository;

  const orderId = 123;
  const mockCheckoutOrderRepository = {
    save: jest.fn(() => Promise.resolve(CHECKOUT_ORDER_ENTITY_MOCK)),
    findOne: jest.fn(() => Promise.resolve(CHECKOUT_ORDER_ENTITY_MOCK)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckoutRepository,
        {
          provide: 'CheckoutOrderRepository',
          useValue: mockCheckoutOrderRepository,
        },
      ],
    }).compile();

    repository = module.get<CheckoutRepository>(CheckoutRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('save', () => {
    it('should save and return the checkout order', async () => {
      const result = await repository.save(CHECKOUT_ORDER_ENTITY_MOCK);

      expect(result).toEqual(CHECKOUT_ORDER_ENTITY_MOCK);
      expect(mockCheckoutOrderRepository.save).toHaveBeenCalledTimes(1);
      expect(mockCheckoutOrderRepository.save).toHaveBeenCalledWith(
        CHECKOUT_ORDER_ENTITY_MOCK,
      );
    });
  });

  describe('find', () => {
    it('should return the checkout order for a given order id', async () => {
      const result = await repository.find(orderId);

      expect(result).toEqual(CHECKOUT_ORDER_ENTITY_MOCK);
      expect(mockCheckoutOrderRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockCheckoutOrderRepository.findOne).toHaveBeenCalledWith({
        where: { order_id: orderId },
      });
    });
  });
});
