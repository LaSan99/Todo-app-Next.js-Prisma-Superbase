import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

if (!global.prisma) {
  global.prisma = prismaClientSingleton();
}

export const prisma = global.prisma;

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
