import { BadRequestException,Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Promo } from "../model/promo.entity";
import { EditPromo } from "../model/edit.promo.entity";
@Injectable()
export class PromoService {
  constructor(
    @InjectRepository(Promo)
    private promoRepository: Repository<Promo>,
  ) {}


  async findById(id: number): Promise<Promo> {
    const promo = await this.promoRepository.findOne({
      where:{id:id}
    });

    if (!promo) {
      throw new NotFoundException();
    }
    return promo;
  }

  async getAllPromos(): Promise<Promo[]> {
    const promos = await this.promoRepository.find();
    return promos;
  }

  async create(promo: Promo): Promise<Promo> {
    const inserted = await this.promoRepository.save(promo);
    return this.findById(inserted.id);
  }

  async remove(id: number): Promise<boolean> {
     const result =  await this.promoRepository.delete(id);
     return result.affected > 0
    }
  
    async edit(promoModel: EditPromo): Promise<boolean> {

      const promo = await this.promoRepository.findOne({
        where:{id:promoModel.id}
      });

      if (!promo|| promoModel.id == null){
        throw new BadRequestException([
          'promo not found.',
        ])
      }

      if (promoModel.is_available != null){
        promo.is_available = promoModel.is_available
      }
      if (promoModel.discount_value != null){
        promo.discount_value = promoModel.discount_value
      }

      const edited = await this.promoRepository.save(promo);
      return edited.id != null
    }   

  
}
