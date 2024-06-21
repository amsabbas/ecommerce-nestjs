import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from '@nestjs/class-validator';
import { Address } from './address.entity';

@Entity("Areas")
export class Area {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsNotEmpty()
  @Column()
  name: string;

  @OneToMany(() => Address, address => address.area, { eager: false })
  address: Address;
}
