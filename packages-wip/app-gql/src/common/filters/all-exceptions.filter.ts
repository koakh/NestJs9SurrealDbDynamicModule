import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    Logger.error(exception, AllExceptionsFilter.name);
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;
    // get context
    const ctx = host.switchToHttp();

    // if is working in graphql context we leave error bubble up to apolloServer
    // else "Cannot read properties of undefined (reading 'originalUrl')"
    // more info https://github.com/nestjs/nest/issues/5958
    if ((ctx as any).contextType === 'graphql') {
      throw exception;
    }

    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      // path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: `${(exception as any)?.name} : ${(exception as any)?.message}`,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
