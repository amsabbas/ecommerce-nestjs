import { BadRequestException,Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Ads } from "../model/ads.entity";
import { Repository } from "typeorm";
import { User } from "../../user/model/user.entity";
import { Constants } from '../../base/model/constants';
@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(Ads)
    private adsRepository: Repository<Ads>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}


  async findById(id: number): Promise<Ads> {
    const ad = await this.adsRepository.findOne({
      where:{id:id}
    });

    if (!ad) {
      throw new NotFoundException();
    }
    return ad;
  }

  async getAllAds(): Promise<Ads[]> {
    const ads = await this.adsRepository.find();
    return ads;
  }

  async create(id: number,ad: Ads): Promise<Ads> {

    const user = await this.usersRepository.findOne({
        where:{id:id}
      });
     
    if (user.role == Constants.userNormal) {
        throw new BadRequestException([
          'admin only can create ads',
        ]);
    }

    const inserted = await this.adsRepository.save(ad);
    return this.findById(inserted.id);
  }

  async remove(id: number,userId:number): Promise<boolean> {

    const user = await this.usersRepository.findOne({
        where:{id:userId}
      });
     
    if (user.role == Constants.userNormal) {
        throw new BadRequestException([
          'admin only can create ads',
        ]);
    }
  
     return (await this.adsRepository.delete(id)).affected > 0;
    }
  

  
}
