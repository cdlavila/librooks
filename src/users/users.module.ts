import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { Admin } from './entities/admin.entity';
import { Client } from './entities/client.entity';
import { AdminsService } from './services/admins.service';
import { AdminsController } from './controllers/admins.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Admin, Client])],
  controllers: [AdminsController],
  providers: [AdminsService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
