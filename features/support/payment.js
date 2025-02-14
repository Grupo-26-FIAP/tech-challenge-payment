const { setWorldConstructor } = require('@cucumber/cucumber');

class CustomWorld {
  constructor() {
    this.orderId = null;
  }
}

setWorldConstructor(CustomWorld);
