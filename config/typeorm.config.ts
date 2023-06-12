import { ConnectionOptions, DataSource } from 'typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

export const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT || '6001'),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  entities: [join(__dirname, '../', '**', '*.entity.js')],
  synchronize: false,
  migrations: ['./dist/migrations/*.{ts,js}'],
};
export default new DataSource(config);
