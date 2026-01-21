import { BaseSoftDeleteEntity } from '@/shared/entities/base-soft-delete.entity';
import { Entity, Property } from '@mikro-orm/core';

@Entity({ tableName: 'products' })
export class Product extends BaseSoftDeleteEntity<Product> {
  @Property({ type: 'varchar', name: 'sku', length: 100 })
  sku: string;

  @Property({ type: 'varchar', name: 'type', length: 50 })
  type: string;

  @Property({ type: 'tinyint', name: 'status' })
  status: number;

  @Property({ type: 'varchar', name: 'name', length: 255 })
  name: string;
}
