import {
    Body,
    Controller,
    Get,
    Param, Post,   Request, UseGuards,Delete,
    Query
  } from "@nestjs/common";
import { Product } from "../model/product.entity";
import { JwtAuthGuard } from './../../auth/model/jwt-auth.guard';
import { Req } from './../../auth/model/request-user';
import { ProductService } from "../service/product.service";
import { EditProduct } from "../model/edit.product.entity";
import { Roles } from './../../auth/model/roles.decorator';
import { Role } from './../../auth/model/role.enum';
import { RolesGuard } from './../../auth/model/roles.guard';
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}
  
  
    @Get('getAllProducts')
    getAllProducts(@Query('keyword') keyword?: string): Promise<Product[]> {
      return this.productService.getAllProducts(keyword);
    }

    @Get('getAllProductsByCategoryID/:id')
    getAllProductsByCategoryID(@Param('id') id: number): Promise<Product[]> {
      return this.productService.getAllProductsByCategoryID(id);
    }
  
    @Get(':id')
    getById(@Param('id') id: number): Promise<Product> {
      return this.productService.findById(id);
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Delete(':id')
    @Roles(Role.Admin)
    deleteById(@Request() { user }: Req,@Param('id') id: number): Promise<boolean> {
    return this.productService.remove(id);
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post('createProduct')
    @Roles(Role.Admin)
    create(@Request() { user }: Req, @Body() product: Product): Promise<Product> {
      return this.productService.create(product);
    }

    @UseGuards(JwtAuthGuard)
    @Post('editProduct')
    @Roles(Role.Admin)
    editProduct(@Request() { user }: Req, @Body() product: EditProduct): Promise<Product> {
      return this.productService.edit(product);
    }
}
  