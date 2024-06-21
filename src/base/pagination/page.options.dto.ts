import { Expose, Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, Max, Min } from '@nestjs/class-validator';
import { Order } from "./order";

export class PageOptionsDto {
 
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;


  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;


  get skip(): number {
    return (this.page - 1) * this.take;
  }
}