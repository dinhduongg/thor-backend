import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { GlobalHeaderInterceptor } from './core/interceptors/global.interceptor';
import { TransformInterceptor } from './core/interceptors/transform.interceptor';
import { logBanner } from './shared/utilities';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port');

  // Bật trust proxy nếu đứng sau Nginx / reverse proxy
  app.set('trust proxy', true);

  // set global prefix
  app.setGlobalPrefix('api');

  // cấu hình versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // bật CORS
  app.enableCors();

  // sử dụng các global interceptor, filter, pipe
  app.useGlobalInterceptors(new GlobalHeaderInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port, () => {
    logBanner([
      '✅ SERVER STARTED SUCCESSFULLY ✅',
      `🚀 Listening on: http://localhost:${port}`,
      `📚 Swagger docs: http://localhost:${port}/api-docs`,
      `🕒 Started at: ${new Date().toLocaleTimeString()}`,
    ]);
  });
}
bootstrap();
