import { prisma } from '@/lib/prisma';

export const prismaFetchAuctionEvent = async () => {
  try {
    const auctionEndEvents = await prisma.auctionEndEvent.findMany({
      orderBy: {
        blockNumber: 'desc',
      },
    });

    return auctionEndEvents;
  } catch (error) {
    console.error('Error fetching auction end events:', error);
    throw error;
  }
};
