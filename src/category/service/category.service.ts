import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../model/category.entity";
import { Repository } from "typeorm";
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
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

  async create(category: Category): Promise<Category> {
    const inserted = await this.categoryRepository.save(category);
    return this.findById(inserted.id);
  }

  async remove(id: number): Promise<boolean> {
    return (await this.categoryRepository.delete(id)).affected > 0;
  }

  
}
