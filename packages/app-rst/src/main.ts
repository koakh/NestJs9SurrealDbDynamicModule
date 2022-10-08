import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters';

async function bootstrap() {
  const context = 'NestApplication';
  const app = await NestFactory.create(AppModule);
  // get app instances
  const AppHttpAdapter = app.get(HttpAdapterHost);  
  const configService = app.get<ConfigService>(ConfigService);
  // config vars
  const httpServerPort = configService.get<string>('httpServerPort');
  // middleware
  app.useGlobalFilters(new AllExceptionsFilter(AppHttpAdapter));
  app.useGlobalPipes(new ValidationPipe());
  // start server
  await app.listen(httpServerPort);
  Logger.log(`Application is running on: ${await app.getUrl()}`, context);
  Logger.log(`using surrealDb host: ${configService.get('surrealDbUrl')}`, context);
}
bootstrap();
