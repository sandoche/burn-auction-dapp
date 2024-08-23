import type { AuctionInfo } from '@/types/AuctionInfo';
import { viemClient } from '@/utilities/viem';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/contract';
import { E } from '@/utilities/error-handling';
import { Log } from '@/utilities/logger';

const FIRST_AUCTION_BLOCK = process.env.FIRST_AUCTION_BLOCK ? BigInt(process.env.FIRST_AUCTION_BLOCK) : BigInt(0);

// TODO: update types
export const rpcFetchBiddingHistory = async (round: bigint): Promise<unknown> => {
  const filter = await viemClient.createContractEventFilter({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    eventName: 'Bid',
    args: {
      round,
    },
    fromBlock: FIRST_AUCTION_BLOCK,
  });

  const [error, result] = await E.try(() => viemClient.getFilterLogs({ filter }));

  if (error) {
    Log().error('Error events from contract:', error);
    throw error;
  }

  return result;
};
