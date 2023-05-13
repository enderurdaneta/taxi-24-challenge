import { CORRELATION_TRACE } from 'src/middleware/correlationid/correlation-id.middleware';

export const loggerOptions = {
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
    autoLogging: false,
    serializers: {
      req() {
        return undefined;
      },
      res() {
        return undefined;
      },
    },
    customProps: function (req) {
      return {
        correlationId: req.headers[CORRELATION_TRACE],
      };
    },
  },
};
