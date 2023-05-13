import { HttpException, HttpStatus, Logger } from '@nestjs/common';

function catchError(
  logger: Logger,
  error,
  functionName: string,
  message: string,
) {
  const status = error?.status || HttpStatus.INTERNAL_SERVER_ERROR;
  if (status != 404 && status != 400)
    logger.error({
      message,
      functionName,
      error,
    });
  throw new HttpException(error.message, status);
}

export default catchError;
