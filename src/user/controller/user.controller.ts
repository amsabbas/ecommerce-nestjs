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
import { Roles } from './../../auth/model/roles.decorator';
import { Role } from './../../auth/model/role.enum';
import { RolesGuard } from './../../auth/model/roles.guard';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.Admin)
  @Get('getUsers')
  getUsers(
    @Request() { user }: Req,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<User>> {
    return this.userService.getUsers(pageOptionsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() { user }: Req): Promise<User> {
    return this.userService.findById(user.userId);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.Admin)
  @Get(':id')
  getById(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  deleteById(@Param('id') id: number): Promise<boolean> {
    return this.userService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('editProfile')
  edit(@Request() { user }: Req, @Body() newUser: EditUser): Promise<boolean> {
      return this.userService.edit(user.userId,newUser);
  }
}
