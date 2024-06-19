import {
    Body,
    Controller,
    Get,
    Param, Post,   Request, UseGuards
  } from "@nestjs/common";
import { CategoryService } from "../service/category.service";
import { Category } from "../model/category.entity";
import { JwtAuthGuard } from './../../auth/model/jwt-auth.guard';
import { Req } from './../../auth/model/request-user';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
  
  
    @Get('getAllCategories')
    getAllCategories(): Promise<Category[]> {
      return this.categoryService.getAllCategories();
    }
  
    @Get(':id')
    getById(@Param('id') id: number): Promise<Category> {
      return this.categoryService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('createCategory')
    create(@Request() { user }: Req, @Body() category: Category): Promise<Category> {
      return this.categoryService.create(user.userId,category);
    }
}
  