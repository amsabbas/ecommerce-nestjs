import {
  Body,
  Controller,
  Delete,
  Get,
  Param, Post, Put,
  Query,
  Request,
  UseGuards
} from "@nestjs/common";
import { UserService } from '../service/user.service';
import { User } from '../model/user.entity';
import { JwtAuthGuard } from './../../auth/model/jwt-auth.guard';
import { Req } from './../../auth/model/request-user';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get('profile')
  getProfile(@Request() { user }: Req): Promise<User> {
    return this.userService.findById(user.userId);
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
  @Post()
  create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }
 
}
