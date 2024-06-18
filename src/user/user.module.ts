import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { UserService } from '../user/service/user.service';
import { UserController } from '../user/controller/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule],
})
export class UserModule {}
