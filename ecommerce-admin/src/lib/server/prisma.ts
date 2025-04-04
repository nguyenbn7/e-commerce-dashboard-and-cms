import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient();

if (!import.meta.env.PROD) globalForPrisma.prisma = prisma;

export default prisma;
