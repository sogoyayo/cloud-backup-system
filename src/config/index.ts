import * as dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_LIFETIME: string= process.env.JWT_LIFETIME as string;
