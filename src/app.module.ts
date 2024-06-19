import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './base/config/database.config';
import { UserModule } from './user/user.module';
import  { AuthModule } from './auth/auth.module';
import  { AdsModule } from './ads/ads.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'enviroments/.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(databaseConfig),
    AuthModule,
    UserModule,
    AdsModule,
    CategoryModule,
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
