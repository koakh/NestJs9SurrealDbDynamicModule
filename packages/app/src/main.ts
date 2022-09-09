import { Logger } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const AppHttpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(AppHttpAdapter));
  await app.listen(3000);
  Logger.log(`Application is running on: ${await app.getUrl()}`, 'NestApplication');
}
bootstrap();
