import {
    Body,
    Controller,
    Get,
    Param, Post,   Request, UseGuards,Delete
  } from "@nestjs/common";
import { JwtAuthGuard } from './../../auth/model/jwt-auth.guard';
import { Req } from './../../auth/model/request-user';
import { PromoService } from "../service/promo.service";
import { Promo } from "../model/promo.entity";
import { EditPromo } from "../model/edit.promo.entity";

@UseGuards(JwtAuthGuard)
@Controller('promos')
export class PromoController {
    constructor(private readonly promoService: PromoService) {}
  
    @Get('getAllPromos')
    getAllPromos(): Promise<Promo[]> {
      return this.promoService.getAllPromos();
    }
  
    @Get(':id')
    getById(@Param('id') id: number): Promise<Promo> {
      return this.promoService.findById(id);
    }

    @Post('createPromo')
    create(@Request() { user }: Req, @Body() promo: Promo): Promise<Promo> {
      return this.promoService.create(user.userId,promo);
    }

    @Delete(':id')
    deleteById(@Request() { user }: Req,@Param('id') id: number): Promise<boolean> {
    return this.promoService.remove(id,user.userId);
    }

    @Post('editPromo')
    edit(@Request() { user }: Req, @Body() promo: EditPromo): Promise<boolean> {
        return this.promoService.edit(user.userId,promo);
    }
}
  