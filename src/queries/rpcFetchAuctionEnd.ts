// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { viemPublicClient } from '@/utilities/viem';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/contract';
import { E } from '@/utilities/error-handling';
import { Log } from '@/utilities/logger';
import type { AuctionEndEvent } from '@/types/AuctionEndEvent';

const FIRST_AUCTION_BLOCK = process.env.FIRST_AUCTION_BLOCK ? BigInt(process.env.FIRST_AUCTION_BLOCK) : BigInt(0);

export const rpcFetchAuctionEnd = async (round: bigint | null = null): Promise<AuctionEndEvent[]> => {
  const filter = await viemPublicClient.createContractEventFilter({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    eventName: 'AuctionEnd',
    fromBlock: FIRST_AUCTION_BLOCK,
    args: round ? { round } : {},
  });

  const [error, result] = await E.try(() => viemPublicClient.getFilterLogs({ filter }));

  if (error) {
    Log().error('Error events from contract:', error);
    throw error;
  }

  return result as AuctionEndEvent[];
};
