export interface EnvironmentVariableInterface {
  NODE_ENV: 'test' | 'development' | 'staging' | 'production';
  APP_NAME: string;
  APP_PORT: string;
  APP_VERSION: string;
  APP_DOCUMENTATION_ENDPOINT: string;
  MONGO_PORT: number;
  MONGO_HOST: string;
  MONGO_DB: string;
  MONGO_USER: string;
  MONGO_PASSWORD: string;
  USER_TOKEN_SECRET: string;
  USER_TOKEN_EXPIRES_IN: number;
  MERCADO_PAGO_PAYMENT_URL: string;
  MERCADO_PAGO_TOKEN: string;
  MERCADO_PAGO_NOTIFICATION_URL: string;
  MERCADO_PAGO_USER_ID: string;
  MERCADO_PAGO_EXTERNAL_POS_ID: string;
  CACHE_SERVICE_HOST: string;
  CACHE_SERVICE_PORT: number;
  COGNITO_CLIENT_ID: string;
  COGNITO_USER_POOL_ID: string;
}
