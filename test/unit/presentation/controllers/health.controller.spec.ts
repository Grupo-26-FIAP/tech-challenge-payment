import { HealthCheckService } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from '@Presentation/controllers/health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  const mockHealthCheckService = {
    check: jest.fn(() => ({})),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: mockHealthCheckService,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('check', () => {
    it('should call HealthCheckService.check and return health status', async () => {
      const result = await controller.check();

      expect(result).toEqual({});
      expect(mockHealthCheckService.check).toHaveBeenCalledTimes(1);
      expect(mockHealthCheckService.check).toHaveBeenCalledWith([]);
    });
  });
});
