import { IsEmail, IsNotEmpty, IsString }  from '@nestjs/class-validator';

export class ResetPassword {

    @IsNotEmpty()
    @IsString()
    public  password:string;
    
}