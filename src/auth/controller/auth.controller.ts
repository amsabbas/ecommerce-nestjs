import { Body, Controller, Get, Post,Query, Res  } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthModel } from '../model/auth.model';
import { User } from './../../user/model/user.entity';
import { ForgotPassword } from './../../user/model/forgot-password';
import { ResetPassword } from './../../user/model/reset-password';
import { Response } from 'express';
import { join } from 'path';
import { readFile } from 'fs/promises';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() auth: AuthModel) {
    return this.authService.login(auth);
  }

  @Post('register')
  create(@Body() user: User): Promise<User> {
    return this.authService.register(user);
  }

  @Post('forgotPassword')
  forgot(@Body() forgotPassword: ForgotPassword) {
    return this.authService.forgot(forgotPassword);
  }

  @Post('reset-password')
  resetPassword(@Query('token') token: string, @Body() resetPassword: ResetPassword) {
    return this.authService.resetPassword(token, resetPassword);
  }

  @Get('reset')
  async reset(@Query('token') token: string, @Res() res: Response) : Promise<void> {
    const filePath = join(__dirname, '..', '..', 'public', 'reset-password.html');
    let html = await readFile(filePath, 'utf-8');
    
    html = html.replace('tokenFromNestJS', `${token}`);
    res.send(html);
   }
}
