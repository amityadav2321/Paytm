import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";



// Load the connection URL
const connectionString = process.env.DATABASE_URL!;

// Create the adapter
const adapter = new PrismaPg({
  connectionString,
});

// Avoid multiple instances during development (Next.js hot reload)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create the Prisma client using the adapter
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

// Save prisma instance globally in dev
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
