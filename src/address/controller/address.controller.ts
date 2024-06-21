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

@UseGuards(JwtAuthGuard)
@Controller('addresses')
export class AddressController {
    
    constructor(private readonly addressService: AddressService) {}
  
    @Get('getAreas')
    getAreas(@Request() { user }: Req,): Promise<Area[]> {
      return this.addressService.getAreas();
    }


    @Post('createArea')
    createArea(@Request() { user }: Req, @Body() area: Area): Promise<Area> {
      return this.addressService.createArea(user.userId,area);
    }


    @Delete('area/:id')
    deleteAreaById(@Request() { user }: Req,@Param('id') id: number): Promise<boolean> {
    return this.addressService.removeArea(id,user.userId);
    }

    @Get('getAddresses')
    getAddresses(@Request() { user }: Req,): Promise<Address[]> {
      return this.addressService.getAddresses(user.userId);
    }

    @Delete('address/:id')
    deleteAddressById(@Request() { user }: Req,@Param('id') id: number): Promise<boolean> {
    return this.addressService.removeAddress(id,user.userId);
    }

    @Get('getPrimaryAddress')
    getPrimaryAddress(@Request() { user }: Req,): Promise<Address> {
      return this.addressService.getPrimaryAddress(user.userId);
    }

    @Post('createAddress')
    createAddress(@Request() { user }: Req, @Body() address: Address): Promise<Address> {
      return this.addressService.createAddress(address);
    }

    @Post('changeAddressToPrimary/:id')
    changeAddressToPrimary(@Request() { user }: Req,@Param('id') id: number): Promise<Address> {
      return this.addressService.changeAddressToPrimary(user.userId,id);
    }

}
  