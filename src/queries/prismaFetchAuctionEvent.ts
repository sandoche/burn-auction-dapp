import { prisma } from '@/utilities/prisma';
import { E } from '@/utilities/error-handling';

export const prismaFetchAuctionEvent = async (page: number, itemsPerPage: number, round: bigint | null = null) => {
  const [error, auctionEndEvents] = await E.try(() =>
    prisma.auctionEndEvent.findMany({
      orderBy: {
        blockNumber: 'asc',
      },
      where: {
        round: round ? round.toString() : undefined,
      },
      include: {
        coins: true,
      },
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
    }),
  );

  if (error) {
    console.error('Error fetching auction end events:', error);
    throw error;
  }

  return auctionEndEvents;
};

prismaFetchAuctionEvent.count = async () => {
  const [error, count] = await E.try(() =>
    prisma.auctionEndEvent.count()
  );

  if (error) {
    console.error('Error counting auction end events:', error);
    throw error;
  }

  return count;
};
