import { Global, Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvironment } from "./environment";
import { DatabaseModule } from './database/database.module';
import config from './config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvironment(),
      load: [config],
      isGlobal: true
    }),
    DatabaseModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
