import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Address } from "../model/address.entity";
import { Area } from "../model/area.entity";
import { EditAreaDTO } from "../model/edit.area.entity";
@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    @InjectRepository(Area)
    private areaRepository: Repository<Area>,
  ) {}

  async getAreas(): Promise<Area[]> {
    return await this.areaRepository.find();
  }

  async getAddresses(userId:number): Promise<Address[]> {
    return await this.addressRepository.find(
      {
        where : {user_id : userId}
      }
    );
  }

  async getPrimaryAddress(userId:number): Promise<Address> {
    const address = await this.addressRepository.findOne(
      {
        where : {user_id : userId, is_primary:true}
      }
    );

    if (!address){
      throw new NotFoundException();
    }

    return address;
  }

  async findAddressById(id: number): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where:{id:id}
    });

    if (!address) {
      throw new NotFoundException();
    }
    return address;
  }

  async findAreaById(id: number): Promise<Area> {
    const area = await this.areaRepository.findOne({
      where:{id:id}
    });

    if (!area) {
      throw new NotFoundException();
    }
    return area;
  }

  async createArea(area: Area): Promise<Area> {
    const inserted = await this.areaRepository.save(area);
    return this.findAreaById(inserted.id);
  }

  async createAddress(userId:number,address: Address): Promise<Address> {

    const addressess = await this.addressRepository.find({
      where : {user_id:userId}
     });  
    if (addressess.length <= 0){
      address.is_primary = true
    }else{
      address.is_primary = false
    }

    address.user_id = userId;
    const inserted = await this.addressRepository.save(address);
    return this.findAddressById(inserted.id);
  }

  async removeArea(id: number): Promise<boolean> {
     await this.addressRepository.delete({
      area_id:id
     });

     return (await this.areaRepository.delete(id)).affected > 0;
  }

  async editArea(data:EditAreaDTO): Promise<Area> {
    const area = await this.areaRepository.findOne({
      where : {id:data.id}
     });  
     if (!area) {
      throw new NotFoundException();
    }
     area.name = data.name;
     const updated = await this.areaRepository.save(area);
     return this.findAreaById(updated.id);

  }

  async removeAddress(id: number,userId:number): Promise<boolean> {
    const address = await this.addressRepository.findOne({
      where : {id:id}
     });

    const result = await this.addressRepository.delete({
      id:id
     });

    if (address.is_primary && result.affected > 0){
      const addressess = await this.addressRepository.find({
        where : {user_id:userId}
       });  
       if (addressess.length > 0){
          addressess[0].is_primary = true
          await this.addressRepository.save(addressess[0])
       }
     }

     return result.affected > 0;
  }

  async changeAddressToPrimary(userId:number,addressId: number): Promise<Address> {

    const address = await this.addressRepository.findOne({
      where : {user_id:userId,is_primary:true}
     });  
     address.is_primary = false
     await this.addressRepository.save(address);

     const currentAddress = await this.addressRepository.findOne({
      where : {id:addressId}
     });  
     currentAddress.is_primary = true

    const inserted = await this.addressRepository.save(currentAddress);
    return this.findAddressById(inserted.id);
  }
}
