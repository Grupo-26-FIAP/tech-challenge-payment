import { OrderResponseDto } from '@Application/dtos/response/order/order.response.dto';
import { CheckoutUseCase } from '@Application/use-cases/payment/checkout.use-case';
import { Inject, Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class MessageHandler {
  private sqs: AWS.SQS;
  constructor(
    @Inject(CheckoutUseCase)
    private readonly chackoutUseCase: CheckoutUseCase,
  ) {
    this.sqs = new AWS.SQS();
  }

  @SqsMessageHandler(process.env.ORDER_QUEUE_NAME, false)
  async handleMessage(message: AWS.SQS.Message) {
    const data = JSON.parse(message.Body) as OrderResponseDto;

    console.log('Message received', data);

    this.chackoutUseCase.execute(data);

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
