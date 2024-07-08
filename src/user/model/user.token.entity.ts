import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from '@nestjs/class-validator';

@Entity("UsersToken")
export class UserToken {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsNotEmpty()
  @Column()
  token: string;

  @IsNotEmpty()
  @Column()
  user_id: number;
}
