import {
    Body,
    Controller,
    Get,
    Param, Post,   Request, UseGuards,Delete,
  } from "@nestjs/common";
import { AdsService } from "../service/ads.service";
import { Ads } from "../model/ads.entity";
import { JwtAuthGuard } from './../../auth/model/jwt-auth.guard';
import { Req } from './../../auth/model/request-user';
import { Roles } from './../../auth/model/roles.decorator';
import { Role } from './../../auth/model/role.enum';
import { RolesGuard } from './../../auth/model/roles.guard';


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

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post('createAd')
    @Roles(Role.Admin)
    create(@Request() { user }: Req, @Body() ads: Ads): Promise<Ads> {
      return this.adsService.create(ads);
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Delete(':id')
    @Roles(Role.Admin)
    deleteById(@Request() { user }: Req,@Param('id') id: number): Promise<boolean> {
    return this.adsService.remove(id);
    }
}
  