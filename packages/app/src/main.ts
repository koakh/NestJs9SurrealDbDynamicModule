import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const AppHttpAdapter = app.get(HttpAdapterHost);
  // TODO:
  // const configService = app.get<ConfigService>(ConfigService);
  // const httpsServerPort = configService.get<string>('httpsServerPort');
  app.useGlobalFilters(new AllExceptionsFilter(AppHttpAdapter));
  // middleware
  app.useGlobalPipes(new ValidationPipe());
  // https://github.com/nestjs/graphql/issues/1053
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     exceptionFactory: (errors: ValidationError[]): => {
  //       return new UserInputError('VALIDATION_ERROR', {
  //         invalidArgs: errors,
  //       });
  //     },
  //   }),
  // );
  await app.listen(3000);
  Logger.log(`Application is running on: ${await app.getUrl()}`, 'NestApplication');
}
bootstrap();
