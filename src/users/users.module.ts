import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { Admin } from './entities/admin.entity';
import { Client } from './entities/client.entity';
import { AdminsService } from './services/admins.service';
import { AdminsController } from './controllers/admins.controller';
import { ClientsService } from './services/clients.service';
import { ClientsController } from './controllers/clients.controller';
import { MailModule } from '../mail/mail.module';
import { FinancesModule } from '../finances/finances.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Admin, Client]),
    MailModule,
    FinancesModule,
  ],
  controllers: [AdminsController, ClientsController],
  providers: [AdminsService, UsersService, ClientsService],
  exports: [UsersService],
})
export class UsersModule {}
