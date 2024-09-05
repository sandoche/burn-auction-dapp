// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { prisma } from '@/utilities/prisma';

export const prismaFetchAuctionEvent = async (round: bigint | null = null) => {
  try {
    const auctionEndEvents = await prisma.auctionEndEvent.findMany({
      orderBy: {
        blockNumber: 'desc',
      },
      where: {
        round: round ? round.toString() : undefined,
      },
      include: {
        coins: true,
      },
    });

    return auctionEndEvents;
  } catch (error) {
    console.error('Error fetching auction end events:', error);
    throw error;
  }
};
