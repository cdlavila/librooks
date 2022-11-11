import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppEnvironment } from './app.environment';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { MailModule } from './mail/mail.module';
import { WalletsService } from './finances/services/wallets.service';
import { WalletsController } from './finances/controllers/wallets.controller';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: AppEnvironment[process.env.NODE_ENV] || '.env',
      load: [databaseConfig, authConfig],
      isGlobal: true,
      cache: true,
    }),
    CacheModule.register({ isGlobal: true }),
    DatabaseModule,
    MailModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, WalletsController],
  providers: [AppService, JwtStrategy, WalletsService],
})
export class AppModule {}
