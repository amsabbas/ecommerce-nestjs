import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './../../user/service/user.service';
import { User } from './../../user/model/user.entity';
import { JwtService } from '@nestjs/jwt';
import { TokenModel } from '../model/token.model';
import { AuthModel } from '../model/auth.model';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../model/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
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
    const user = await this.validateUser(auth.email, auth.password);
    if (!user) {
      throw new BadRequestException();
    }
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: User): Promise<User> {
    return this.userService.create(user);
  }
}
