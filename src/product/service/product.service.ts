import { BadRequestException,Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../user/model/user.entity";
import { Product } from "../model/product.entity";
import { EditProduct } from "../model/edit.product.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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

  async create(id: number,product: Product): Promise<Product> {

    const user = await this.usersRepository.findOne({
        where:{id:id}
      });
     
    if (user.role == "user") {
        throw new BadRequestException([
          'admin only can create products',
        ]);
    }

    const inserted = await this.productRepository.save(product);
    return this.findById(inserted.id);
  }

  async edit(id: number,product: EditProduct): Promise<Product> {

    const user = await this.usersRepository.findOne({
        where:{id:id}
      });
     
    if (user.role == "user") {
        throw new BadRequestException([
          'admin only can edit products',
        ]);
    }

    const savedProduct = await this.productRepository.findOne({
      where:{id:product.productID}
    });

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
    if (product.isAvailable != null){
      savedProduct.isAvailable = product.isAvailable
    }
    if (product.photo_url != null){
      savedProduct.photo_url = product.photo_url
    }
    const edited = await this.productRepository.save(savedProduct);
    return this.findById(edited.id);
  }

  async remove(id: number,userId:number): Promise<boolean> {

  const user = await this.usersRepository.findOne({
      where:{id:userId}
    });
   
  if (user.role == "user") {
      throw new BadRequestException([
        'admin only can delete products',
      ]);
  }

    const result = await this.productRepository.delete(id);
    return result.affected > 0
  }

  
}
