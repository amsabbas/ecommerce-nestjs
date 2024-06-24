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
import { Roles } from './../../auth/model/roles.decorator';
import { Role } from './../../auth/model/role.enum';
import { RolesGuard } from './../../auth/model/roles.guard';

@Controller('promos')
export class PromoController {
    constructor(private readonly promoService: PromoService) {}
  
    @UseGuards(JwtAuthGuard)
    @Get('getAllPromos')
    getAllPromos(): Promise<Promo[]> {
      return this.promoService.getAllPromos();
    }
  
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getById(@Param('id') id: number): Promise<Promo> {
      return this.promoService.findById(id);
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post('createPromo')
    @Roles(Role.Admin)
    create(@Request() { user }: Req, @Body() promo: Promo): Promise<Promo> {
      return this.promoService.create(promo);
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Delete(':id')
    @Roles(Role.Admin)
    deleteById(@Request() { user }: Req,@Param('id') id: number): Promise<boolean> {
    return this.promoService.remove(id);
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post('editPromo')
    @Roles(Role.Admin)
    edit(@Request() { user }: Req, @Body() promo: EditPromo): Promise<boolean> {
        return this.promoService.edit(promo);
    }
}
  