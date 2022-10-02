import { Global, Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppEnvironment } from "./app.environment";
import databaseConfig from "./config/database.config";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: AppEnvironment[process.env.NODE_ENV] || '.env.development',
      load: [databaseConfig],
      isGlobal: true
    }),
    DatabaseModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
