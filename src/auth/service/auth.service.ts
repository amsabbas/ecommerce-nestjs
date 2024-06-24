import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { UserService } from './../../user/service/user.service';
import { User } from './../../user/model/user.entity';
import { JwtService } from '@nestjs/jwt';
import { TokenModel } from '../model/token.model';
import { AuthModel } from '../model/auth.model';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../model/jwt-payload';
import { ForgotPassword } from './../../user/model/forgot-password';
import { ResetPassword } from './../../user/model/reset-password';
import { MailerService} from '@nestjs-modules/mailer';
import { Role } from '../model/role.enum';
import { Constants } from 'src/base/model/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private mailService : MailerService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (await bcrypt.compare(password, user.password)) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(auth: AuthModel): Promise<TokenModel> {
    
    if (auth.email == null || auth.password == null){
      throw new BadRequestException();
    }
    
    const user = await this.validateUser(auth.email, auth.password);
    if (!user) {
      throw new BadRequestException();
    }
    
    const role = user.role == Constants.userAdmin ? Role.Admin :  Role.User
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      role: role
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: User): Promise<User> {
    return this.userService.create(user);
  }

  async forgot(forgotPassword: ForgotPassword){
    const user = await this.userService.findByEmail(forgotPassword.email);
    
    if (!user){
      throw new BadRequestException('Invalid Email');
    }
    const token =  await this.generateToken(user);
    return await this.sendResetMail(forgotPassword.email,token);
  }

  async generateToken(user: any) {
    const payload = { userId: user.id, email: user.email };
    return this.jwtService.sign(payload); 
  }

  async sendResetMail(toemail: string , token : string) {
    
    const mail = await this.mailService.sendMail({
      to: toemail,
        from:"amsabbbas@outlook.com",
        subject: "Reset Password",
        html:"<h1>Reset Password</h1> <h2>Welcome</h2><p>To reset your password, please click on this link</p><a href=http://localhost:3000/auth/reset?token="
        +token+">Click this </a>"
    });
    if (mail){
      return {message:"Email is sent successfuly"} ; 
    }
    else {
      return {message : "An error occurred while sending mail" } ; 
    }
  }

  async resetPassword(token : string ,resetPassword: ResetPassword) {
    const decodedToken = await this.jwtService.verifyAsync(token);
  
    const userId = decodedToken.userId;
    const user = await this.userService.findById(userId);

    if (!user) {
      return {message : "User does not exist" };
    }
  
    const hashedPassword = await UserService.hashPassword(resetPassword.password);
  
    const passwordReset = await this.userService.updateUser(user.id,hashedPassword);
   
    if (!passwordReset) {
      return { message: "Error" };
    }
    return { message: "Your Password Has been Reset Successfully" };
  }  
}
