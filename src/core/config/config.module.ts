import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configurationConfig from './configuration.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [configurationConfig],
      envFilePath: [
        `.env.${process.env.NODE_ENV || 'development'}`,
        '.env.local',
        '.env',
      ],
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
