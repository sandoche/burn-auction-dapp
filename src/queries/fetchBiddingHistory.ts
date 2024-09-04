// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { rpcFetchBiddingHistory } from './rpcFetchBiddingHistory';
import { rpcFetchBlockDate } from './rpcFetchBlockDate';
import { E } from '@/utilities/error-handling';
import { Log } from '@/utilities/logger';
import type { BiddingHistory } from '@/types/BiddingHistory';

export const fetchBiddingHistory = async (round: bigint): Promise<BiddingHistory> => {
  const [error, biddingEvents] = await E.try(() => rpcFetchBiddingHistory(round));

  if (error) {
    Log().error('Error fetching events date:', error);
    throw error;
  }

  const biddingHistory: BiddingHistory = biddingEvents.map((event) => {
    return {
      bidder: event.args.sender,
      amount: event.args.amount,
      time: new Date(), // to fix
      transactionHash: event.transactionHash,
      blockNumber: event.blockNumber,
    };
  });

  for (const item of biddingHistory) {
    const time = await rpcFetchBlockDate(item.blockNumber);
    item.time = time || null;
  }

  return biddingHistory.reverse();
};
