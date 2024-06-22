import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from '@nestjs/class-validator';
import { OrderItem } from './order.item.entity';

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
  
  @OneToMany(() => OrderItem, orderItem => orderItem.order, { eager: true })
  orderItem: OrderItem;
}

