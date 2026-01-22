import { Module } from '@nestjs/common'
import { CategoryTranslationsAdminModule } from './admin/category-translations-admin.module'

@Module({
  imports: [CategoryTranslationsAdminModule],
})
export class CategoryTranslationsModule {}
