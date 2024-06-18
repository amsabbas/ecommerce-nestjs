import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthModel } from '../model/auth.model';
import { User } from './../../user/model/user.entity';

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
}
