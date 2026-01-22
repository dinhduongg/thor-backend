import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { MikroORM } from '@mikro-orm/core'

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  constructor(private readonly orm: MikroORM) {}

  async onModuleDestroy() {
    await this.orm.close()
  }
}
