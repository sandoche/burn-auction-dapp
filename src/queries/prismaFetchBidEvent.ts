// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { prisma } from '@/utilities/prisma';

export const prismaFetchBidEvent = async (round: bigint) => {
  try {
    const bidEvents = await prisma.bidEvent.findMany({
      orderBy: {
        blockNumber: 'desc',
      },
      where: {
        round: round,
      },
    });

    return bidEvents;
  } catch (error) {
    console.error('Error fetching bid events:', error);
    throw error;
  }
};
