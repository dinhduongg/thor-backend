import { Index, PrimaryKey, Property } from '@mikro-orm/core';

@Index({ properties: ['created_at'] })
export abstract class BaseTimestampEntity<T> {
  @PrimaryKey()
  id!: number;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }

  @Property({ onCreate: () => new Date() })
  created_at = new Date();

  @Property({ onUpdate: () => new Date() })
  updated_at = new Date();
}
