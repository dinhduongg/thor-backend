import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DatabaseModule } from '@/core/database/database.module'
import { GlobalModule } from '@/modules/global.module'
import configurationConfig from './core/config/configuration.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurationConfig],
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env.local', '.env'],
    }),
    DatabaseModule,
    GlobalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
