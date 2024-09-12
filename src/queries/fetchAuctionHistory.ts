// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { E } from '@/utilities/error-handling';
import { Log } from '@/utilities/logger';
import type { AuctionHistory } from '@/types/AuctionHistory';
import { HexAddress } from '@/types/HexAddress';

import { prismaFetchAuctionEvents } from './prismaFetchAuctionEvents';

export const fetchAuctionHistory = async (page: number | 'last', itemsPerPage: number): Promise<AuctionHistory> => {
  const [errorTotalItems, totalItems] = await E.try(() => prismaFetchAuctionEvents.count());
  if (errorTotalItems) {
    Log().error('Error fetching total items:', errorTotalItems);
    throw errorTotalItems;
  }

  const lastPage = Math.ceil(totalItems / itemsPerPage);

  const [error, auctionEvents] = await E.try(() => prismaFetchAuctionEvents(page === 'last' ? lastPage : page, itemsPerPage));
  if (error) {
    Log().error('Error fetching events date:', error);
    throw error;
  }

  const history: AuctionHistory['history'] = auctionEvents.map((event) => {
    return {
      round: BigInt(event.round),
      amountInEvmos: BigInt(event.burned),
      winnerAddress: event.winner as HexAddress,
      blockNumber: BigInt(event.blockNumber),
    };
  });

  const [errorTotalBurned, totalBurned] = await E.try(() => prismaFetchAuctionEvents.totalBurned());
  if (errorTotalBurned) {
    Log().error('Error fetching total burned:', errorTotalBurned);
    throw error;
  }

  const auctionHistory = {
    history: history.reverse(),
    totalBurned: totalBurned ?? 0,
    totalItems,
  };

  return auctionHistory;
};
