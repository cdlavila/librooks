import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'librooks-admin',
  password: 'librooks-mqW6ZzKnat',
  database: 'librooks',
  // host: process.env.DATABASE_HOST,
  // port: parseInt(process.env.DATABASE_PORT, 10),
  // name: process.env.DATABASE_NAME,
  // username: process.env.DATABASE_USER,
  // password: process.env.DATABASE_PASSWORD,
  synchronize: false,
  logging: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
