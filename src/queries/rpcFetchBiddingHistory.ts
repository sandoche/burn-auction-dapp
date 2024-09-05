// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import type { BidEvent } from '@/types/BidEvent';
import { viemPublicClient } from '@/utilities/viem';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/contract';
import { E } from '@/utilities/error-handling';
import { Log } from '@/utilities/logger';

const FIRST_AUCTION_BLOCK = process.env.FIRST_AUCTION_BLOCK ? BigInt(process.env.FIRST_AUCTION_BLOCK) : BigInt(0);

export const rpcFetchBiddingHistory = async (round: bigint): Promise<BidEvent[]> => {
  const filter = await viemPublicClient.createContractEventFilter({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    eventName: 'Bid',
    args: {
      round,
    },
    fromBlock: FIRST_AUCTION_BLOCK,
  });

  const [error, result] = await E.try(() => viemPublicClient.getFilterLogs({ filter }));

  if (error) {
    Log().error('Error events from contract:', error);
    throw error;
  }

  return result as BidEvent[];
};
