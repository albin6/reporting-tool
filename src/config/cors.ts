import { CorsOptions } from "cors";
import { env } from "./env";

export const corsConfig: CorsOptions = {
  origin: [env.FRONTEND_URL, env.ALTERNATE_FRONTEND_URL].filter(
    (url): url is string => typeof url === "string"
  ),
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
