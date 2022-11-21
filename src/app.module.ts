import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { MailModule } from './mail/mail.module';
import { FinancesModule } from './finances/finances.module';
import { NewsModule } from './news/news.module';
import { BooksModule } from './books/books.module';
import { PurchasesModule } from './purchases/purchases.module';
import { BookingsModule } from './bookings/bookings.module';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [databaseConfig, authConfig],
      isGlobal: true,
      cache: true,
    }),
    CacheModule.register({ isGlobal: true }),
    DatabaseModule,
    MailModule,
    UsersModule,
    AuthModule,
    FinancesModule,
    NewsModule,
    BooksModule,
    PurchasesModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
