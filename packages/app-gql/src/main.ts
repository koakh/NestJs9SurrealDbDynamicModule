import { Logger } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(3000);
  // used to use AllExceptionsFilter
  const app = await NestFactory.create(AppModule);
  const AppHttpAdapter = app.get(HttpAdapterHost);
  // middleware
  // required class-transformer, bring from solidaryChain server
  // app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter(AppHttpAdapter));
  await app.listen(3000);
  Logger.log(
    `Application is running on: ${await app.getUrl()}`,
    'NestApplication',
  );
}
bootstrap();
