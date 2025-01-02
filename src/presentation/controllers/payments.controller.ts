import { Controller, Get } from "@nestjs/common";

@Controller("/api/payments")
export class PaymentsController {
  @Get()
  findAll(): string {
    return '{"id": 1, "value": 300, "description": "hamburger" }';
  }
}
