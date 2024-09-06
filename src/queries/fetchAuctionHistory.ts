// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { prismaFetchAuctionEvents } from './prismaFetchAuctionEvents';
import { E } from '@/utilities/error-handling';
import { Log } from '@/utilities/logger';
import type { AuctionHistory } from '@/types/AuctionHistory';
import { HexAddress } from '@/types/HexAddress';

export const fetchAuctionHistory = async (page: number, itemsPerPage: number): Promise<AuctionHistory> => {
  const [error, auctionEvents] = await E.try(() => prismaFetchAuctionEvents(page, itemsPerPage));

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

  const totalItems = await prismaFetchAuctionEvents.count();

  const auctionHistory = {
    history: history.reverse(),
    totalBurned: history.reduce((acc, curr) => acc + curr.amountInEvmos, BigInt(0)), // in the future with pagination we should get the total from an indexer
    totalItems,
  };

  return auctionHistory;
};
