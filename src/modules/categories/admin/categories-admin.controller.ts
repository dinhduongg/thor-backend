import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { CreateCategoriesAdminDto } from './dto/create-categories-admin.dto'
import { UpdateCategoriesAdminDto } from './dto/update-categories-admin.dto'
import { CategoryQuery } from './interfaces/query.interface'
import { CreateService, FindAllService, FindOneService, RemoveService, UpdateService } from './services'

@Controller('admin/categories')
export class CategoriesAdminController {
  constructor(
    private readonly createService: CreateService,
    private readonly findAllService: FindAllService,
    private readonly findOneService: FindOneService,
    private readonly updateService: UpdateService,
    private readonly removeService: RemoveService,
  ) {}

  @Post()
  create(@Body() createCategoriesAdminDto: CreateCategoriesAdminDto) {
    return this.createService.execute(createCategoriesAdminDto)
  }

  @Get()
  findAll(@Query() query: CategoryQuery) {
    return this.findAllService.execute(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneService.execute(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriesAdminDto: UpdateCategoriesAdminDto) {
    return this.updateService.execute(+id, updateCategoriesAdminDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeService.execute(+id)
  }
}
