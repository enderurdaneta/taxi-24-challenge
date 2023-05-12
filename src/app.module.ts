import { Module } from '@nestjs/common';
import { Request } from 'express';

//ConfigService
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import appConfigSchema from './config/app.schema';

//LoggerModule
import { LoggerModule } from 'nestjs-pino';
import { CORRELATION_TRACE } from './middleware/correlationid/correlation-id.middleware';
import { DriverModule } from './modules/driver/driver.module';
import { TravelModule } from './modules/travel/travel.module';
import { PassengerModule } from './modules/passenger/passenger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/config';

@Module({
  imports: [
    // config
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: appConfigSchema,
    }),
    // logger
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  messageKey: 'message',
                },
              }
            : undefined,
        messageKey: 'message',
        customProps: (req: Request) => {
          return {
            correlation: req[CORRELATION_TRACE],
          };
        },
        autoLogging: false,
        serializers: {
          req() {
            return undefined;
          },
          res() {
            return undefined;
          },
        },
      },
    }),
    // TypeORM
    TypeOrmModule.forRoot(dataSourceOptions),
    DriverModule,
    TravelModule,
    PassengerModule,
  ],
})
export class AppModule {}
