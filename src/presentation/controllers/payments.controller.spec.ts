import { Test, TestingModule } from "@nestjs/testing";
import { PaymentsController } from "./payments.controller";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

describe("PaymentsController", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/api/payments (GET)", () => {
    return request(app.getHttpServer())
      .get("/api/payments")
      .expect(200)
      .expect('{"id": 1, "value": 300, "description": "hamburger" }');
  });

  afterAll(async () => {
    await app.close();
  });
});
