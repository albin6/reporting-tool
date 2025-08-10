import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { logger } from './config/logger';
import { appConfig } from './config/app';
import { corsConfig } from './config/cors';
import prisma from './config/database';

class Server {
    private app: Application;
    private port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.handleShutdown();
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
        this.app.get('/', async (req: Request, res: Response) => {
            const users = await prisma.user.findMany();
            res.json({ success: true, data: users });
        });
    }

    private handleShutdown() {
        process.on('SIGINT', async () => {
            logger.info('Shutting down server...');
            await prisma.$disconnect();
            process.exit(0);
        });

        process.on('SIGTERM', async () => {
            logger.info('Shutting down server...');
            await prisma.$disconnect();
            process.exit(0);
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
