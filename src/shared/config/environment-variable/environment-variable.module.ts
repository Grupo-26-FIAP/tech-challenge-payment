import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';
import { EnvironmentVariableService } from './environment-variable.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('test', 'development', 'staging', 'production')
          .required(),
        APP_NAME: Joi.string().required(),
        APP_PORT: Joi.number().default(3000),
        APP_VERSION: Joi.string().required(),
        APP_DOCUMENTATION_ENDPOINT: Joi.string().required(),
        MONGO_PORT: Joi.number().default(5432),
        MONGO_HOST: Joi.string().required(),
        MONGO_DB: Joi.string().required(),
        MONGO_USER: Joi.string().required(),
        MONGO_PASSWORD: Joi.string().required(),
      }),
      validationOptions: {
        presence: 'required',
        allowUnknown: true,
        abortEarly: false,
      },
    }),
  ],
})
export class EnvironmentVariableModule {
  static forRoot(options?: ConfigModuleOptions): DynamicModule {
    return {
      global: options.isGlobal,
      module: EnvironmentVariableModule,
      providers: [EnvironmentVariableService],
      exports: [EnvironmentVariableService],
    };
  }
}
