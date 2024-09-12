// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { prisma } from '@/utilities/prisma';
import { E } from '@/utilities/error-handling';

export const prismaFetchAuctionEvent = async (round: bigint) => {
  const [error, auctionEndEvents] = await E.try(() =>
    prisma.auctionEndEvent.findMany({
      orderBy: {
        round: 'asc',
      },
      where: {
        round: Number(round),
      },
      include: {
        coins: true,
      },
    }),
  );

  if (error) {
    console.error('Error fetching auction end events:', error);
    throw error;
  }

  return auctionEndEvents;
};
