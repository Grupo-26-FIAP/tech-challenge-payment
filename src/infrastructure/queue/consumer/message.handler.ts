import { PaymentMapper } from '@Application/mappers/payment.mapper';
import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';

@Injectable()
export class MessageHandler {
  private sqs: AWS.SQS;
  constructor() {
    this.sqs = new AWS.SQS();
  }

  @SqsMessageHandler('order-created-queue', false)
  async handleMessage(message: AWS.SQS.Message) {
    const data = JSON.parse(message.Body);

    console.log({ data: data });

    const payment = PaymentMapper.EventToPaymentRequestDto(
      data,
      'http://example.com',
    );

    console.log(payment);

    await this.sqs
      .deleteMessage({
        QueueUrl: process.env.QUEUE_URL,
        ReceiptHandle: message.ReceiptHandle,
      })
      .promise();
  }
}
