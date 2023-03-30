import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ExceptionInterceptor } from './utilities/interceptors/exception.interceptor';
import { ResponseInterceptor } from './utilities/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.useGlobalInterceptors(new ExceptionInterceptor());
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(
    configService.get<number>('APPLICATION_PORT'),
    configService.get<string>('APPLICATION_URL'),
  );

  console.log(`application is running: ${await app.getUrl()}`);
}
bootstrap();
