import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Ads } from "../model/ads.entity";
import { Repository } from "typeorm";
@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(Ads)
    private adsRepository: Repository<Ads>,
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

  async create(ad: Ads): Promise<Ads> {
    const inserted = await this.adsRepository.save(ad);
    return this.findById(inserted.id);
  }

  async remove(id: number): Promise<boolean> {  
     return (await this.adsRepository.delete(id)).affected > 0;
    }
  

  
}
