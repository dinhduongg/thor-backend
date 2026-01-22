import { Type } from 'class-transformer'
import { IsDefined, IsOptional, ValidateNested } from 'class-validator'

export class CreateCategoriesAdminPayload {
  @IsOptional()
  sorted?: number

  @IsOptional()
  image_id?: string

  @IsOptional()
  level?: number

  @IsOptional()
  icon?: string

  @IsOptional()
  parent_id?: number
}

export class CreateCategoriesAdminDto {
  @IsDefined({ message: 'Trường category là bắt buộc' })
  @ValidateNested({ message: 'Dữ liệu category không hợp lệ' })
  @Type(() => CreateCategoriesAdminPayload)
  category: CreateCategoriesAdminPayload
}
