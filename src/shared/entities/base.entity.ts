import { PrimaryKey } from '@mikro-orm/core'

export abstract class BaseEntity<T> {
  @PrimaryKey()
  id!: number

  constructor(entity: Partial<T>) {
    Object.assign(this, entity)
  }
}
