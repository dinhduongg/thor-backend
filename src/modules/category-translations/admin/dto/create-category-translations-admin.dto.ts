import { Type } from 'class-transformer'
import { IsDefined, IsOptional, ValidateNested } from 'class-validator'

export class CreateCategoryTranslationsAdminPayload {
  @IsDefined({ message: 'Vui lòng nhập ngôn ngữ' })
  language!: string

  @IsDefined({ message: 'Vui lòng nhập tên danh mục' })
  name!: string

  @IsDefined({ message: 'Vui lòng nhập mã danh mục' })
  category!: number

  @IsOptional()
  description?: string

  @IsOptional()
  meta_title?: string

  @IsOptional()
  meta_description?: string

  @IsOptional()
  slug?: string
}

export class CreateCategoryTranslationsAdminDto {
  @IsDefined({ message: 'Trường category_translation là bắt buộc' })
  @ValidateNested({ message: 'Dữ liệu category_translation không hợp lệ' })
  @Type(() => CreateCategoryTranslationsAdminPayload)
  category_translation: CreateCategoryTranslationsAdminPayload
}
