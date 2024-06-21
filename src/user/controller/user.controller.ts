import {
  Body,
  Controller,
  Delete,
  Get,
  Param, Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { UserService } from '../service/user.service';
import { User } from '../model/user.entity';
import { JwtAuthGuard } from './../../auth/model/jwt-auth.guard';
import { Req } from './../../auth/model/request-user';
import { EditUser } from "../model/edit.user.entity";
import { PageOptionsDto } from "src/base/pagination/page.options.dto";
import { PageDto } from "src/base/pagination/page.dto";

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getUsers')
  getUsers(
    @Request() { user }: Req,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<User>> {
    return this.userService.getUsers(user.userId,pageOptionsDto);
  }

  @Get('profile')
  getProfile(@Request() { user }: Req): Promise<User> {
    return this.userService.findById(user.userId);
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number): Promise<boolean> {
    return this.userService.remove(id);
  }
  @Post()
  create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Post('editProfile')
  edit(@Request() { user }: Req, @Body() newUser: EditUser): Promise<boolean> {
      return this.userService.edit(user.userId,newUser);
  }



}
