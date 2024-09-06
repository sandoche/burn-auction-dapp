// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { prisma } from '@/utilities/prisma';
import { E } from '@/utilities/error-handling';
import { Log } from '@/utilities/logger';

export const prismaFetchAuctionEvents = async (page: number, itemsPerPage: number) => {
  const [error, auctionEndEvents] = await E.try(() =>
    prisma.auctionEndEvent.findMany({
      orderBy: {
        round: 'desc',
      },
      include: {
        coins: true,
      },
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
    }),
  );

  if (error) {
    Log().error('Error fetching auction end events:', error);
    throw error;
  }

  return auctionEndEvents;
};

prismaFetchAuctionEvents.count = async () => {
  const [error, count] = await E.try(() => prisma.auctionEndEvent.count());

  if (error) {
    Log().error('Error counting auction end events:', error);
    throw error;
  }

  return count;
};

prismaFetchAuctionEvents.totalBurned = async () => {
  const [error, totalBurned] = await E.try(() =>
    prisma.auctionEndEvent
      .aggregate({
        _sum: {
          burnedWithoutDecimals: true,
        },
      })
      .then((data) => data._sum.burnedWithoutDecimals),
  );

  if (error) {
    Log().error('Error fetching total burned:', error);
    throw error;
  }

  return totalBurned;
};
