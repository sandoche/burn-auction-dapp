// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { prismaFetchBidEvent } from './prismaFetchBidEvent';
import { rpcFetchBlockDate } from './rpcFetchBlockDate';
import { E } from '@/utilities/error-handling';
import { Log } from '@/utilities/logger';
import type { BiddingHistory } from '@/types/BiddingHistory';
import { HexAddress } from '@/types/HexAddress';

export const fetchBiddingHistory = async (round: bigint): Promise<BiddingHistory> => {
  const [error, biddingEvents] = await E.try(() => prismaFetchBidEvent(round));

  if (error) {
    Log().error('Error fetching events date:', error);
    throw error;
  }

  const biddingHistory: BiddingHistory = biddingEvents.map((event) => {
    return {
      bidder: event.sender as HexAddress,
      amount: BigInt(event.amount),
      time: new Date(), // to fix
      transactionHash: event.transactionHash as HexAddress,
      blockNumber: BigInt(event.blockNumber),
    };
  });

  for (const item of biddingHistory) {
    const time = await rpcFetchBlockDate(item.blockNumber);
    item.time = time || null;
  }

  return biddingHistory.reverse();
};
