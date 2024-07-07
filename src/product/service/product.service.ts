import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../model/product.entity";
import { EditProduct } from "../model/edit.product.entity";
import { Cart } from "src/cart/model/cart.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}


  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where:{id:id}
    });

    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async getAllProductsByCategoryID(id:number): Promise<Product[]> {
    return await this.productRepository.find(
      {
        where:{category_id:id}
      }
    );
  }

  async create(product: Product): Promise<Product> {
    const inserted = await this.productRepository.save(product);
    return this.findById(inserted.id);
  }

  async edit(product: EditProduct): Promise<Product> {

    
    const savedProduct = await this.productRepository.findOne({
      where:{id:product.id}
    });

    if (!product || product.id == null) {
      throw new NotFoundException();
    }

    if (product.description != null){
      savedProduct.description = product.description
    }
    if (product.name != null){
      savedProduct.name = product.name
    }
    if (product.price != null){
      savedProduct.price = product.price
    }
    if (product.quantity != null){
      savedProduct.quantity = product.quantity
    }
    if (product.is_available != null){
      savedProduct.is_available = product.is_available
    }
      
    if (product.photo_url != null){
      savedProduct.photo_url = product.photo_url
    }
    const edited = await this.productRepository.save(savedProduct);
    return this.findById(edited.id);
  }

  async editQuantity(productId: number,quantity:number): Promise<Product> {
    
    const product = await this.productRepository.findOne({
      where:{id:productId}
    });

    if (!product) {
      throw new NotFoundException();
    }

    if (quantity < 0)
      product.quantity = 0
    else
      product.quantity = quantity;

    const edited = await this.productRepository.save(product);
    return this.findById(edited.id);
  }


  async remove(id: number): Promise<boolean> {
    await this.cartRepository.delete({product_id: id})
    const result = await this.productRepository.delete(id);
    return result.affected > 0
  }

  
}
