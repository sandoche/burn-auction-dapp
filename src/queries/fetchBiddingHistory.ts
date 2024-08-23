import { rpcFetchBiddingHistory } from './rpcFetchBiddingHistory';
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
    };
  });

  return biddingHistory;
};
