import { BadRequestException,Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../model/category.entity";
import { Repository } from "typeorm";
import { User } from "../../user/model/user.entity";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}


  async findById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where:{id:id}
    });

    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async create(id: number,category: Category): Promise<Category> {

    const user = await this.usersRepository.findOne({
        where:{id:id}
      });
     
    if (user.role == "user") {
        throw new BadRequestException([
          'admin only can create categories',
        ]);
    }

    const inserted = await this.categoryRepository.save(category);
    return this.findById(inserted.id);
  }

  async remove(id: number,userId:number): Promise<void> {

  const user = await this.usersRepository.findOne({
      where:{id:userId}
    });
   
  if (user.role == "user") {
      throw new BadRequestException([
        'admin only can delete categories',
      ]);
  }

    await this.categoryRepository.delete(id);
  }

  
}
