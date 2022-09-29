// Working
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'librooks-admin',
      password: 'librooks-mqW6ZzKnat',
      database: 'librooks',
      entities: [],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}

// import { Module, Global } from '@nestjs/common';
// import { ConfigModule, ConfigService } from "@nestjs/config";
// import { TypeOrmModule } from '@nestjs/typeorm';
//
// @Global()
// @Module({
//   imports: [
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         type: 'mysql',
//         host: configService.get('config.host'),
//         port: configService.get('config.port'),
//         username: configService.get('config.user'),
//         password: configService.get('config.password'),
//         database: configService.get('config.name'),
//         entities: [],
//         synchronize: true,
//       })
//     })
//   ],
//   exports: [TypeOrmModule]
// })
// export class DatabaseModule {}



// NOO

// import { Module, Global } from '@nestjs/common';
// import { ConfigType } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
//
// import config from '../config';
//
// @Global()
// @Module({
//   imports: [
//     TypeOrmModule.forRootAsync({
//       inject: [config.KEY],
//       useFactory: (configService: ConfigType<typeof config>) => {
//         const { user, host, name, password, port } = configService.database;
//         return {
//           type: 'mysql',
//           host,
//           port,
//           username: user,
//           password,
//           database: name,
//           synchronize: false,
//           autoLoadEntities: true,
//         };
//       },
//     }),
//   ],
//   exports: [TypeOrmModule],
// })
// export class DatabaseModule {}
