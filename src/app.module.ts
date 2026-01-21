import { Module } from '@nestjs/common';

import { ConfigModule } from '@/core/config/config.module';
import { DatabaseModule } from '@/core/database/database.module';
import { GlobalModule } from '@/modules/global.module';

@Module({
  imports: [ConfigModule, DatabaseModule, GlobalModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
