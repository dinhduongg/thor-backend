import { Module } from '@nestjs/common'
import { CategoriesModule } from './categories/categories.module'
import { CategoryTranslationsModule } from './category-translations/category-translations.module'
import { HealthCheckModule } from './health-check/health-check.module'

@Module({
  imports: [HealthCheckModule, CategoriesModule, CategoryTranslationsModule],
})
export class GlobalModule {}
