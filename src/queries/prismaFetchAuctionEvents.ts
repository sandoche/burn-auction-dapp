// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { prisma } from '@/utilities/prisma';
import { E } from '@/utilities/error-handling';

export const prismaFetchAuctionEvents = async (page: number, itemsPerPage: number) => {
  const [error, auctionEndEvents] = await E.try(() =>
    prisma.auctionEndEvent.findMany({
      orderBy: {
        blockNumber: 'asc',
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

prismaFetchAuctionEvents.count = async () => {
  const [error, count] = await E.try(() => prisma.auctionEndEvent.count());

  if (error) {
    console.error('Error counting auction end events:', error);
    throw error;
  }

  return count;
};
