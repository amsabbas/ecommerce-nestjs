import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from '@nestjs/class-validator';
import { DecimalColumnTransformer } from 'src/base/utils/decimal.utils';

@Entity("Promos")
export class Promo {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsNotEmpty()
  @Column({unique: true})
  promo_code: string;

  @IsNotEmpty()
  @Column()
  is_available: boolean;

  @IsNotEmpty()
  @Column('decimal', {
    precision: 6, scale: 2 ,
    transformer: new DecimalColumnTransformer(),
})
  discount_value: number; 
}
