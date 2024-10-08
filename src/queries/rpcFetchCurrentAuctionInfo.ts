// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import type { AuctionInfo } from '@/types/AuctionInfo';
import { viemPublicClient } from '@/utilities/viem';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/contract';
import { E } from '@/utilities/error-handling';
import { Log } from '@/utilities/logger';

export const rpcFetchCurrentAuctionInfo = async (): Promise<AuctionInfo> => {
  const [error, result] = await E.try(() =>
    viemPublicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'auctionInfo',
    }),
  );

  if (error) {
    Log().error('Error querying contract:', error);
    throw error;
  }

  return result;
};
