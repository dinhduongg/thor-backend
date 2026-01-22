import { Module } from '@nestjs/common'
import { CategoriesAdminModule } from './admin/categories-admin.module'

@Module({
  imports: [CategoriesAdminModule],
})
export class CategoriesModule {}
