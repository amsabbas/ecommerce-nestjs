import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty } from '@nestjs/class-validator';
import { Address } from 'src/address/model/address.entity';
import { Order } from 'src/order/model/order.entity';

@Entity("Users")
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsNotEmpty()
  @Column()
  name: string;

  @IsNotEmpty()
  @Column()
  phone: string;

  @IsNotEmpty()
  @Column()
  role: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @IsNotEmpty()
  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;  

  @OneToMany(() => Address, address => address.user)
  addresses: Address[];

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  static removePassword(userObj: User)  {
    return Object.fromEntries(
      Object.entries(userObj).filter(([key, val]) => key !== 'password')
    );
  }
}
