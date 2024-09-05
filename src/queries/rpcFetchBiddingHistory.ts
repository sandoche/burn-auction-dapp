import type { BidEvent } from '@/types/BidEvent';
import { viemPublicClient } from '@/utilities/viem';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/contract';
import { E } from '@/utilities/error-handling';
import { Log } from '@/utilities/logger';

export const rpcFetchBiddingHistory = async (fromBlock: bigint, toBlock: bigint): Promise<BidEvent[]> => {
  const filter = await viemPublicClient.createContractEventFilter({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    eventName: 'Bid',
    fromBlock,
    toBlock,
  });

  const [error, result] = await E.try(() => viemPublicClient.getFilterLogs({ filter }));

  if (error) {
    Log().error('Error events from contract:', error);
    throw error;
  }

  return result as BidEvent[];
};
