import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CategoryTranslationsAdminService } from './category-translations-admin.service'
import { CreateCategoryTranslationsAdminDto } from './dto/create-category-translations-admin.dto'
import { UpdateCategoryTranslationsAdminDto } from './dto/update-category-translations-admin.dto'

@Controller('admin/category-translations')
export class CategoryTranslationsAdminController {
  constructor(private readonly categoryTranslationsAdminService: CategoryTranslationsAdminService) {}

  @Post()
  create(@Body() createCategoryTranslationsAdminDto: CreateCategoryTranslationsAdminDto) {
    return this.categoryTranslationsAdminService.create(createCategoryTranslationsAdminDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryTranslationsAdminDto: UpdateCategoryTranslationsAdminDto) {
    return this.categoryTranslationsAdminService.update(+id, updateCategoryTranslationsAdminDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryTranslationsAdminService.remove(+id)
  }
}
