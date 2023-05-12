import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

export const CORRELATION_TRACE = 'x-correlation-trace';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const id = randomUUID();

    req[CORRELATION_TRACE] = id;
    res.set(CORRELATION_TRACE, id);

    next();
  }
}
