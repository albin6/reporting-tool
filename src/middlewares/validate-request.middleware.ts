import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { ERROR_MESSAGES, HttpStatusCode } from '../constants';

export function validateRequest(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof Error && 'errors' in error) {
                return res.status(HttpStatusCode.BAD_REQUEST).json({
                    message: ERROR_MESSAGES.VALIDATION_FAILED,
                    errors: (error as any).errors,
                });
            }
            return res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    };
}
