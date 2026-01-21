import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from '@/core/database/database.module';

@Module({
  imports: [HealthCheckModule, DatabaseModule, ProductsModule],
})
export class GlobalModule {}
