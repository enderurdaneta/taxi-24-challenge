import { Module } from '@nestjs/common';
import { Request } from 'express';

//ConfigService
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import appConfigSchema from './config/app.schema';

//LoggerModule
import { LoggerModule } from 'nestjs-pino';
import { CORRELATION_TRACE } from './middleware/correlationid/correlation-id.middleware';
import { DatabaseModule } from './database/database.module';
import { DriverModule } from './module/driver/driver.module';
import { TravelModule } from './module/travel/travel.module';
import { PassengerModule } from './module/passenger/passenger.module';

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
    DatabaseModule,
    DriverModule,
    TravelModule,
    PassengerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
