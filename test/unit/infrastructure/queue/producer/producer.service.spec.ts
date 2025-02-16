import { MessageProducer } from '@Infrastructure/queue/producer/producer.service';
import { Test, TestingModule } from '@nestjs/testing';
import { SqsService } from '@ssut/nestjs-sqs';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid'),
}));

describe('MessageProducer', () => {
  let messageProducer: MessageProducer;

  const mockSqsService = { send: jest.fn((): any => ({})) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageProducer,
        {
          provide: SqsService,
          useValue: mockSqsService,
        },
      ],
    }).compile();

    messageProducer = module.get<MessageProducer>(MessageProducer);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(messageProducer).toBeDefined();
  });

  it('should call send on SqsService with correct parameters', async () => {
    const queue = 'test-queue';
    const body = { key: 'value' };

    await messageProducer.sendMessage(queue, body);

    expect(uuidv4).toHaveBeenCalledTimes(2);
    expect(mockSqsService.send).toHaveBeenCalledWith(queue, {
      id: 'mock-uuid',
      groupId: 'mock-uuid',
      body: JSON.stringify(body),
      delaySeconds: 0,
    });
  });

  it('should handle errors gracefully when send fails', async () => {
    mockSqsService.send.mockRejectedValue(new Error('SQS send failed'));

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const queue = 'test-queue';
    const body = { key: 'value' };

    await messageProducer.sendMessage(queue, body);

    expect(consoleSpy).toHaveBeenCalledWith(
      'error in producing image!',
      new Error('SQS send failed'),
    );
    expect(mockSqsService.send).toHaveBeenCalledTimes(1);
    consoleSpy.mockRestore();
  });
});
