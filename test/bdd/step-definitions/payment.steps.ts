import { FindCheckoutUseCase } from '@Application/use-cases/payment/find-checkout.use-case';
import { PaymentNotificationUseCase } from '@Application/use-cases/payment/payment-notification.use-case';
import { Given, Then, When } from '@cucumber/cucumber';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CHECKOUT_ORDER_ENTITY_MOCK } from '@Test/unit/__mocks__/checkout-order.mock';
import { strict as assert } from 'assert';
import * as request from 'supertest';
import { PaymentController } from '../../../src/presentation/controllers/payment.controller';

let app: INestApplication;
let response: request.Response;

const mockCheckout = {
  execute: async () => CHECKOUT_ORDER_ENTITY_MOCK,
};

const mockCreatePayment = { execute: async () => undefined };

Given('the system is running', async () => {
  const moduleFixture = await Test.createTestingModule({
    controllers: [PaymentController],
    providers: [
      { provide: FindCheckoutUseCase, useValue: mockCheckout },
      { provide: PaymentNotificationUseCase, useValue: mockCreatePayment },
    ],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

When('I access the route with orderId {int}', async (orderId: number) => {
  response = await request(app.getHttpServer()).get(
    `/payments/checkout/${orderId}`,
  );
});

Then(
  'the system should return the checkout status with HTTP code {int}',
  (statusCode: number) => {
    assert.strictEqual(response.status, statusCode);

    const responseBody = { ...response.body };
    const mockData = { ...CHECKOUT_ORDER_ENTITY_MOCK };
    delete responseBody.id;
    delete mockData.id;

    assert.deepStrictEqual(responseBody, mockData);
  },
);
