import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    const formattedResponse = {
      message: Array.isArray(exceptionResponse.message) ? exceptionResponse.message[0] : exceptionResponse.message,
      error: exceptionResponse.error || 'Bad Request',
      statusCode: status,
    };

    response.status(status).json(formattedResponse);
  }
}