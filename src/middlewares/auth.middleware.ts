import { Request, Response, NextFunction } from 'express';
import { ERROR_MESSAGES, HttpStatusCode } from '../constants';

export class AuthMiddleware {
    static isAuthenticated(req: Request, res: Response, next: NextFunction) {
        if (req.user) {
            return next();
        }
        return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: ERROR_MESSAGES.UNAUTHORIZED });
    }

    static hasRole(role: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            if (req.user && req.user.role === role) {
                return next();
            }
            return res.status(HttpStatusCode.FORBIDDEN).json({ message: ERROR_MESSAGES.FORBIDDEN });
        };
    }

    // Example: Validate JWT token
    static validateToken(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: ERROR_MESSAGES.TOKEN_MISSING });
        }
        // Add your JWT verification logic here
        // If valid, attach user to req and call next()
        // If invalid, return 401
        next();
    }
}
