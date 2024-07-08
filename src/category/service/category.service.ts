import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../model/category.entity";
import { Repository } from "typeorm";
import { Product } from "src/product/model/product.entity";
import { I18nContext, I18nService } from "nestjs-i18n";
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private readonly i18n: I18nService,
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

    const products = await this.productRepository.count({
      where : {
          category_id : id
      }
    })

    if (products > 0) {
      throw new BadRequestException([
        this.i18n.t('language.category_deletion_products_message', { lang: I18nContext.current().lang })
      ]);
    }

    return (await this.categoryRepository.delete(id)).affected > 0;
  }

  
}
