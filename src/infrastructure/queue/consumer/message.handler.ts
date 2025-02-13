import { OrderResponseDto } from '@Application/dtos/response/order/order.response.dto';
import { CheckoutUseCase } from '@Application/use-cases/payment/checkout.use-case';
import { Inject, Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';

@Injectable()
export class MessageHandler {
  private readonly sqs: AWS.SQS;

  constructor(
    @Inject(CheckoutUseCase)
    private readonly checkoutUseCase: CheckoutUseCase,
  ) {
    this.sqs = new AWS.SQS();
  }

  @SqsMessageHandler(process.env.ORDER_QUEUE_NAME, false)
  async handleMessage(message: AWS.SQS.Message) {
    const data = JSON.parse(message.Body) as OrderResponseDto;

    console.log('Message received', data);

    await this.checkoutUseCase.execute(data);

    await this.sqs
      .deleteMessage({
        QueueUrl: process.env.ORDER_QUEUE_URL,
        ReceiptHandle: message.ReceiptHandle,
      })
      .promise()
      .catch((error) => {
        console.log(error);
      });
  }
}
