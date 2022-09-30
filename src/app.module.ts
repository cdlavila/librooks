import { Global, Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from "./config/database.config";
import { environments } from "./environment";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env.development',
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
