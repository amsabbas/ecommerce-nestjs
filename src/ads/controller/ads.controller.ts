import {
    Body,
    Controller,
    Get,
    Param, Post,   Request, UseGuards
  } from "@nestjs/common";
import { AdsService } from "../service/ads.service";
import { Ads } from "../model/ads.entity";
import { JwtAuthGuard } from './../../auth/model/jwt-auth.guard';
import { Req } from './../../auth/model/request-user';

@Controller('ads')
export class AdsController {
    constructor(private readonly adsService: AdsService) {}
  
  
    @Get('getAllAds')
    getAllAds(): Promise<Ads[]> {
      return this.adsService.getAllAds();
    }
  
    @Get(':id')
    getById(@Param('id') id: number): Promise<Ads> {
      return this.adsService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('createAd')
    create(@Request() { user }: Req, @Body() ads: Ads): Promise<Ads> {
      return this.adsService.create(user.userId,ads);
    }
}
  