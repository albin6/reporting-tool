import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
    DB_HOST: z.string(),
    DB_PORT: z.string().transform(Number),
    DB_USER: z.string(),
    DB_PASS: z.string(),
    DB_NAME: z.string(),
    PORT: z.string().transform(Number).default(3000),
    FRONTEND_URL: z.string().url(),
    ALTERNATE_FRONTEND_URL: z.string().url().optional(),
    JWT_SECRET: z.string().min(32).max(64),
    JWT_REFRESH_SECRET: z.string().min(32).max(64),
});

export const env = envSchema.parse(process.env);
