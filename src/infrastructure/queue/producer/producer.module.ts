import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { config } from 'dotenv';
import { MessageProducer } from './producer.service';
config();

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

console.log({ PAYMENT_QUEUE_URL: process.env.PAYMENT_QUEUE_URL });
console.log({ PAYMENT_QUEUE_NAME: process.env.PAYMENT_QUEUE_NAME });

@Module({
  imports: [
    SqsModule.register({
      consumers: [],
      producers: [
        {
          name: process.env.PAYMENT_QUEUE_NAME,
          queueUrl: process.env.PAYMENT_QUEUE_URL,
          region: process.env.AWS_REGION,
        },
      ],
    }),
  ],
  controllers: [],
  providers: [MessageProducer],
  exports: [MessageProducer],
})
export class ProducerModule {}
