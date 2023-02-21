import { DataSource } from 'typeorm';

const entities = [
  __dirname + '/../../modules/**/*.entity{.ts,.js}',
  __dirname + '/../../modules/**/*.view-entity{.ts,.js}',
];

const migrations = [__dirname + '/../../database/migrations/*{.ts,.js}'];

export const connectionSource = new DataSource({
  entities,
  migrations,
  type: 'postgres',
  name: 'default',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
});
