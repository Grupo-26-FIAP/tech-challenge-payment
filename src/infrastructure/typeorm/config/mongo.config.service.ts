import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { EnvironmentVariableService } from '@Shared/config/environment-variable/environment-variable.service';

@Injectable()
export class MongoConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly environmentVariableService: EnvironmentVariableService,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const mongoEnvs = this.environmentVariableService.mongoConfig;
    return {
      type: 'mongodb',
      url: mongoEnvs.host,
      synchronize: true,
      autoLoadEntities: true,
      useUnifiedTopology: true,
    };
  }
}
