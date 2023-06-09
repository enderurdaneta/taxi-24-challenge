import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { Request } from 'express';

//ConfigService
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import appConfigSchema from './config/app.schema';

//LoggerModule
import { LoggerModule } from 'nestjs-pino';
import { CorrelationIdMiddleware } from './middleware/correlationid/correlation-id.middleware';
import { DriverModule } from './modules/driver/driver.module';
import { TravelModule } from './modules/travel/travel.module';
import { PassengerModule } from './modules/passenger/passenger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/config';
import { loggerOptions } from './logger/logger-options';

@Module({
  imports: [
    // config
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: appConfigSchema,
    }),
    // logger
    LoggerModule.forRoot(loggerOptions),
    // TypeORM
    TypeOrmModule.forRoot(dataSourceOptions),
    DriverModule,
    TravelModule,
    PassengerModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
