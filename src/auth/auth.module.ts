import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Constants } from '../base/model/constants';
import { JwtStrategy } from './model/jwt.strategy';
import { AuthController } from '../auth/controller/auth.controller';
import { UserService } from './../user/service/user.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: Constants.secret,
      signOptions: { expiresIn: '365d' },
    }),
    MailerModule.forRoot({
      transport:{
        host:"smtp-mail.outlook.com",
        port: 587,
        auth:{
          user:"amsabbbas@outlook.com",
          pass:"A.m.sayed@123"
        }
      }
     }),
  ],
  providers: [AuthService, UserService, JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
