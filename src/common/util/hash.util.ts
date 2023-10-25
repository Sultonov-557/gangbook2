import * as crypto from 'crypto-js';
import { env } from '../config/env.config';

export const encrypt = (message) => {
  return crypto.AES.encrypt(message, env.SECRET_KEY).toString();
};

export const decrypt = (message) => {
  return crypto.AES.decrypt(message, env.SECRET_KEY).toString(crypto.enc.Utf8);
};
