import {
    Body,
    Controller,
    Get,
    Param, Post,   Request, UseGuards,Delete
  } from "@nestjs/common";

import { JwtAuthGuard } from './../../auth/model/jwt-auth.guard';
import { Req } from './../../auth/model/request-user';
import { AddressService } from "../service/address.service";
import { Area } from "../model/area.entity";
import { Address } from "../model/address.entity";
import { Roles } from './../../auth/model/roles.decorator';
import { Role } from './../../auth/model/role.enum';
import { RolesGuard } from './../../auth/model/roles.guard';


@Controller('addresses')
export class AddressController {
    
    constructor(private readonly addressService: AddressService) {}
  
    @UseGuards(JwtAuthGuard)
    @Get('getAreas')
    getAreas(@Request() { user }: Req,): Promise<Area[]> {
      return this.addressService.getAreas();
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post('createArea')
    @Roles(Role.Admin)
    createArea(@Request() { user }: Req, @Body() area: Area): Promise<Area> {
      return this.addressService.createArea(area);
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.Admin)
    @Delete('area/:id')
    deleteAreaById(@Request() { user }: Req,@Param('id') id: number): Promise<boolean> {
    return this.addressService.removeArea(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getAddresses')
    getAddresses(@Request() { user }: Req,): Promise<Address[]> {
      return this.addressService.getAddresses(user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('address/:id')
    deleteAddressById(@Request() { user }: Req,@Param('id') id: number): Promise<boolean> {
    return this.addressService.removeAddress(id,user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getPrimaryAddress')
    getPrimaryAddress(@Request() { user }: Req,): Promise<Address> {
      return this.addressService.getPrimaryAddress(user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('createAddress')
    createAddress(@Request() { user }: Req, @Body() address: Address): Promise<Address> {
      return this.addressService.createAddress(user.userId,address);
    }

    @UseGuards(JwtAuthGuard)
    @Post('changeAddressToPrimary/:id')
    changeAddressToPrimary(@Request() { user }: Req,@Param('id') id: number): Promise<Address> {
      return this.addressService.changeAddressToPrimary(user.userId,id);
    }

}
  