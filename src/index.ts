import express, { Application, Request, Response } from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { logger } from "./config/logger";
import { appConfig } from "./config/app";
import { corsConfig } from "./config/cors";

class Server {
  private app: Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    this.app.use(cors(corsConfig));
    this.app.use((req: Request, res: Response, next) => {
      logger.info(`${req.method} ${req.url}`);
      next();
    });
    this.app.use(rateLimit(appConfig.rateLimit));
    this.app.use(express.json());
  }

  private initializeRoutes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello World!");
    });
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running at http://localhost:${this.port}`);
    });
  }
}

const server = new Server(appConfig.port);
server.start();
