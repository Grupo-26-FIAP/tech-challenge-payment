const { Given, When, Then } = require('@cucumber/cucumber');
const request = require('supertest');
const assert = require('assert');
const app = require('../../src/main'); // Ajuste o caminho para a sua aplicação

let response;

Given('que existe um pedido de checkout com o ID do pedido {int}', async function (orderId) {
  this.orderId = orderId;
});

Given('que não existe um pedido de checkout com o ID do pedido {int}', async function (orderId) {
  this.orderId = orderId;
});

When('eu solicito o checkout para o ID do pedido {int}', async function (orderId) {
  response = await request(app).get(`/checkout/${orderId}`);
});

Then('o status da resposta deve ser {int}', function (statusCode) {
  assert.strictEqual(response.status, statusCode);
});

Then('a resposta deve conter os detalhes do checkout', function () {
  assert.ok(response.body.order_id);
  assert.ok(response.body.qr_data);
});

Then('a resposta deve conter uma mensagem de erro', function () {
  assert.ok(response.body.message);
});
