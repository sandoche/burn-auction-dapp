import { prisma } from '@/lib/prisma';

export const prismaFetchBidEvent = async () => {
  try {
    const bidEvents = await prisma.bidEvent.findMany({
      orderBy: {
        blockNumber: 'desc',
      },
    });

    return bidEvents;
  } catch (error) {
    console.error('Error fetching bid events:', error);
    throw error;
  }
};
