import { cleanEnv, num, str } from 'envalid';
import { config } from 'dotenv';

config();
export const env = cleanEnv(process.env, {
  PORT: num(),
  DATABASE_PORT: num(),
  DATABASE_HOST: str(),
  DATABASE_USER: str(),
  DATABASE_PASSWORD: str(),
  DATABASE_NAME: str(),
  SECRET_KEY: str(),
});
