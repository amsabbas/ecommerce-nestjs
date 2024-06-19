import { BadRequestException,Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../user/model/user.entity";
import { Product } from "../model/product.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}


  async findById(id: number): Promise<Product> {
    const ad = await this.productRepository.findOne({
      where:{id:id}
    });

    if (!ad) {
      throw new NotFoundException();
    }
    return ad;
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

  async remove(id: number,userId:number): Promise<void> {

  const user = await this.usersRepository.findOne({
      where:{id:userId}
    });
   
  if (user.role == "user") {
      throw new BadRequestException([
        'admin only can create products',
      ]);
  }

    await this.productRepository.delete(id);
  }

  
}
