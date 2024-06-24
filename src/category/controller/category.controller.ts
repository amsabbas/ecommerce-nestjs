import {
    Body,
    Controller,
    Get,
    Param, Post,   Request, UseGuards,Delete
  } from "@nestjs/common";
import { CategoryService } from "../service/category.service";
import { Category } from "../model/category.entity";
import { JwtAuthGuard } from './../../auth/model/jwt-auth.guard';
import { Req } from './../../auth/model/request-user';
import { Roles } from './../../auth/model/roles.decorator';
import { Role } from './../../auth/model/role.enum';
import { RolesGuard } from './../../auth/model/roles.guard';

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

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Delete(':id')
    @Roles(Role.Admin)
    deleteById(@Request() { user }: Req,@Param('id') id: number): Promise<boolean> {
    return this.categoryService.remove(id);
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post('createCategory')
    @Roles(Role.Admin)
    create(@Request() { user }: Req, @Body() category: Category): Promise<Category> {
      return this.categoryService.create(category);
    }
}
  