/* eslint-disable prettier/prettier */
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters';

async function bootstrap() {
  const context = 'NestApplication';
  const app = await NestFactory.create(AppModule);
  // get app instances
  const AppHttpAdapter = app.get(HttpAdapterHost);
  const configService = app.get(ConfigService);
  // middleware filters
  app.useGlobalFilters(new AllExceptionsFilter(AppHttpAdapter));
  app.useGlobalPipes(new ValidationPipe());
  // start server
  await app.listen(3000);
  Logger.log(`Application is running on: ${await app.getUrl()}`, context);
  Logger.log(`using surrealDb host: ${configService.get('SURREALDB_URL')}`, context);
}
bootstrap();
