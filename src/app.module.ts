import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Request } from 'express';

//ConfigService
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import appConfigSchema from './config/app.schema';

//LoggerModule
import { LoggerModule } from 'nestjs-pino';
import {
  CorrelationIdMiddleware,
  CORRELATION_TRACE,
} from './middleware/correlationid/correlation-id.middleware';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
