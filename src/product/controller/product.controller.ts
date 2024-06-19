import {
    Body,
    Controller,
    Get,
    Param, Post,   Request, UseGuards,Delete
  } from "@nestjs/common";
import { Product } from "../model/product.entity";
import { JwtAuthGuard } from './../../auth/model/jwt-auth.guard';
import { Req } from './../../auth/model/request-user';
import { ProductService } from "../service/product.service";
import { EditProduct } from "../model/edit.product.entity";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}
  
  
    @Get('getAllProducts')
    getAllProducts(): Promise<Product[]> {
      return this.productService.getAllProducts();
    }
  
    @Get(':id')
    getById(@Param('id') id: number): Promise<Product> {
      return this.productService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteById(@Request() { user }: Req,@Param('id') id: number): Promise<void> {
    return this.productService.remove(id,user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('createProduct')
    create(@Request() { user }: Req, @Body() product: Product): Promise<Product> {
      return this.productService.create(user.userId,product);
    }

    @UseGuards(JwtAuthGuard)
    @Post('editProduct')
    editProduct(@Request() { user }: Req, @Body() product: EditProduct): Promise<Product> {
      return this.productService.edit(user.userId,product);
    }
}
  