import dotenv from 'dotenv';

dotenv.config();

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const TIBIA_DATA_API = process.env.TIBIA_DATA_API;
export const DATABASE_URL = process.env.DATABASE_URL;
export const FRONT_END_URL =
  process.env.FRONT_END_URL || 'http://localhost:3000';
