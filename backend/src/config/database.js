import { PrismaClient } from '@prisma/client';

// Create a single Prisma Client instance
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
});

// Connect to database
export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Prisma connected to MongoDB');
  } catch (error) {
    console.error('❌ Prisma connection error:', error);
    process.exit(1);
  }
};

// Disconnect on app termination
export const disconnectDB = async () => {
  await prisma.$disconnect();
};

export default prisma;
