import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsLatitude, IsLongitude, IsNotEmpty, isLongitude } from '@nestjs/class-validator';
import { DecimalColumnTransformer } from 'src/base/utils/decimal.utils';
import { Area } from './area.entity';

@Entity("Addresses")
export class Address {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsNotEmpty()
  @Column()
  street_name: string;

  @IsNotEmpty()
  @Column()
  floor_no: string;

  @IsNotEmpty()
  @Column()
  building_no: string;

  @IsNotEmpty()
  @Column()
  apartment_no: string;

  @IsNotEmpty()
  @IsLatitude()
  @Column('double', {
    transformer: new DecimalColumnTransformer(),
})
  lat: number;

  @IsNotEmpty()
  @IsLongitude()
  @Column('double', {
    transformer: new DecimalColumnTransformer(),
  })
  lon: number;

  @IsNotEmpty()
  @Column()
  is_primary: boolean;

  @Column()
  user_id: number;

  @IsNotEmpty()
  @Column()
  area_id: number;

  @ManyToOne(() => Area, area => area.address, { eager: true })
  @JoinColumn([{ name: "area_id", referencedColumnName: "id" }])
  area: Area;

}
