import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString } from '@nestjs/class-validator';

@Entity("Users")
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @IsNotEmpty()
  @Column()
  password?: string;
 
}
