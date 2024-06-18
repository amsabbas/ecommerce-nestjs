import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { UserModule } from './user/user.module';
import  { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'enviroments/.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(databaseConfig),
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
