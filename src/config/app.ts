import { env } from "./env";

export const appConfig = {
  port: env.PORT,
  apiPrefix: "/api/v1",
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    maxRequests: 100,
  }
};
