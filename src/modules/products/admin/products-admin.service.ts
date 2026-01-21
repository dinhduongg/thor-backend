import { DatabaseName } from '@/shared/enum';
import { EntityManager } from '@mikro-orm/mysql';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Product } from '../entities/products.entity';

@Injectable()
export class ProductsAdminService {
  constructor(private readonly em: EntityManager) {}

  async createSampleProducts() {
    const samples = [
      this.em.create(Product, {
        name: 'Sample Product 1',
        sku: 'SAMPLE-SKU-001',
        type: 'Sample Type',
        status: 1,
      }),
      this.em.create(Product, {
        name: 'Sample Product 2',
        sku: 'SAMPLE-SKU-002',
        type: 'Another Type',
        status: 1,
      }),
    ];

    this.em.persist(samples);
    await this.em.flush();

    return {
      message: 'Sample products created successfully',
      count: samples.length,
    };
  }
}
