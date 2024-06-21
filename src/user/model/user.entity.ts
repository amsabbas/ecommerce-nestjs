import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty } from '@nestjs/class-validator';

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
  password: string | undefined;

  static removePassword(userObj: User)  {
    return Object.fromEntries(
      Object.entries(userObj).filter(([key, val]) => key !== 'password')
    );
  }
}
