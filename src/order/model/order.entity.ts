import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from '@nestjs/class-validator';
import { OrderItem } from './order.item.entity';
import { DecimalColumnTransformer } from 'src/base/utils/decimal.utils';

@Entity("Orders")
export class Order {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsNotEmpty()
  @Column()
  status: string;

  @IsNotEmpty()
  @Column()
  user_id: number;

  @CreateDateColumn()
  order_date: Date;   

  @IsNotEmpty()
  @Column('decimal', {
    precision: 6, scale: 2 ,
    transformer: new DecimalColumnTransformer(),
})
  subtotal: number;

  @IsNotEmpty()
  @Column('decimal', {
    precision: 6, scale: 2 ,
    transformer: new DecimalColumnTransformer(),
})
  discount: number;
  
  @IsNotEmpty()
  @Column('decimal', {
    precision: 6, scale: 2 ,
    transformer: new DecimalColumnTransformer(),
})
  total: number;

  @IsNotEmpty()
  @Column('decimal', {
    precision: 6, scale: 2 ,
    transformer: new DecimalColumnTransformer(),
})
  deliveryFees: number;
  
  @OneToMany(() => OrderItem, orderItem => orderItem.order, { eager: true })
  orderItem: OrderItem;
}

