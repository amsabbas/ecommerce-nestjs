import { BadRequestException,Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../user/model/user.entity";
import { Constants } from '../../base/model/constants';
import { Promo } from "../model/promo.entity";
import { EditPromo } from "../model/edit.promo.entity";
@Injectable()
export class PromoService {
  constructor(
    @InjectRepository(Promo)
    private promoRepository: Repository<Promo>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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

  async create(id: number,promo: Promo): Promise<Promo> {

    const user = await this.usersRepository.findOne({
        where:{id:id}
      });
     
    if (user.role == Constants.userNormal) {
        throw new BadRequestException([
          'admin only can create promos',
        ]);
    }

    const inserted = await this.promoRepository.save(promo);
    return this.findById(inserted.id);
  }

  async remove(id: number,userId:number): Promise<boolean> {

    const user = await this.usersRepository.findOne({
        where:{id:userId}
      });
     
    if (user.role == Constants.userNormal) {
        throw new BadRequestException([
          'admin only can create promos',
        ]);
    }
  
     const result =  await this.promoRepository.delete(id);
     return result.affected > 0
    }
  
    async edit(id: number,promoModel: EditPromo): Promise<boolean> {

      const user = await this.usersRepository.findOne({
        where:{id:id}
      });
  
      if (user.role == Constants.userNormal) {
        throw new BadRequestException([
          'admin only can edit promos',
        ]);
      }
  
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
