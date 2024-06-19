import { IsNotEmpty, IsEmail}  from '@nestjs/class-validator';

export class ForgotPassword {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

}