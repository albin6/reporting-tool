import { injectable } from 'tsyringe';
import prisma from '../config/database';
import { PrismaClient } from '@prisma/client';

@injectable()
export class TransactionService {
    async run<T>(callback: (tx: PrismaClient) => Promise<T>): Promise<T> {
        return prisma.$transaction(async (tx: PrismaClient) => {
            return callback(tx);
        });
    }
}
