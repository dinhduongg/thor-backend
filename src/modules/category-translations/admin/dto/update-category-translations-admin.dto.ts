import { PartialType } from '@nestjs/mapped-types'
import { CreateCategoryTranslationsAdminDto, CreateCategoryTranslationsAdminPayload } from './create-category-translations-admin.dto'

export class UpdateCategoryTranslationsAdminDto extends PartialType(CreateCategoryTranslationsAdminDto) {
  category_translation?: CreateCategoryTranslationsAdminPayload
}
