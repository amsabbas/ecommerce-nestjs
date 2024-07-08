import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './base/database/database.config';
import { UserModule } from './user/user.module';
import  { AuthModule } from './auth/auth.module';
import  { AdsModule } from './ads/ads.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { ConfigurationModule } from './base/config/config.module';
import { PromoModule } from './promo/promo.module';
import { CheckoutModule } from './checkout/checkout.module';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FileModule } from './file/file.module';
import { FirebaseModule } from './firebase/firebase.module';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { join } from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'enviroments/.env',
      isGlobal: true,
    }),
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: 'en',
        loaderOptions: {
          path: join(__dirname, '/i18n/'),
          watch: true,
        },
        typesOutputPath: join(__dirname, '../src/generated/i18n.generated.ts'),
      }),
      resolvers: [new HeaderResolver(['language'])],
    }),
    TypeOrmModule.forRootAsync(databaseConfig),
    AuthModule,
    UserModule,
    AdsModule,
    CategoryModule,
    ProductModule,
    CartModule,
    ConfigurationModule,
    PromoModule,
    CheckoutModule,
    AddressModule,
    OrderModule,
    DashboardModule,
    FileModule,
    FirebaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
