import { Module } from '@nestjs/common'
import { CategoryTranslationsAdminService } from './category-translations-admin.service'
import { CategoryTranslationsAdminController } from './category-translations-admin.controller'

@Module({
  controllers: [CategoryTranslationsAdminController],
  providers: [CategoryTranslationsAdminService],
})
export class CategoryTranslationsAdminModule {}
