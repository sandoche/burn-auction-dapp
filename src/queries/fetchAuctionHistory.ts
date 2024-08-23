import { rpcFetchAuctionEnd } from './rpcFetchAuctionEnd';
import { E } from '@/utilities/error-handling';
import { Log } from '@/utilities/logger';
import type { AuctionHistory } from '@/types/AuctionHistory';

export const fetchAuctionHistory = async (): Promise<AuctionHistory> => {
  const [error, auctionEvents] = await E.try(() => rpcFetchAuctionEnd());

  if (error) {
    Log().error('Error fetching events date:', error);
    throw error;
  }

  const history: AuctionHistory['history'] = auctionEvents.map((event) => {
    return {
      round: BigInt(event.args.round),
      amountInEvmos: BigInt(event.args.burned),
      winnerAddress: event.args.winner,
      blockNumber: BigInt(event.blockNumber),
    };
  });

  const auctionHistory = {
    history: history.reverse(),
    totalBurned: history.reduce((acc, curr) => acc + curr.amountInEvmos, BigInt(0)),
  };

  return auctionHistory;
};
