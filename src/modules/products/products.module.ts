import { Module } from '@nestjs/common';
import { ProductsAdminModule } from './admin/products-admin.module';

@Module({
  imports: [ProductsAdminModule],
})
export class ProductsModule {}
