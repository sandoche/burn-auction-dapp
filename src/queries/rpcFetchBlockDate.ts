// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { viemPublicClient } from '@/utilities/viem';
import { E } from '@/utilities/error-handling';
import { Log } from '@/utilities/logger';

export const rpcFetchBlockDate = async (blockNumber: bigint): Promise<Date | null> => {
  const [error, result] = await E.try(() => viemPublicClient.getBlock({ blockNumber }));

  if (error) {
    Log().error('Error querying contract:', error);
    return null;
  }

  const timestamp = Number(result.timestamp);
  const date = new Date(timestamp * 1000);

  return date;
};
