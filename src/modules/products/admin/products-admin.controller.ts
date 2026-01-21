import { Controller, Post } from '@nestjs/common';
import { ProductsAdminService } from './products-admin.service';

@Controller('admin/products')
export class ProductsAdminController {
  constructor(private readonly productsAdminService: ProductsAdminService) {}

  @Post()
  async createSampleProducts() {
    return this.productsAdminService.createSampleProducts();
  }
}
