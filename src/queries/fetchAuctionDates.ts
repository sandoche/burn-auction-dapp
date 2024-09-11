// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { E } from '@/utilities/error-handling';
import { Log } from '@/utilities/logger';
import type { AuctionDates } from '@/types/AuctionDates';

import { rpcFetchEpochInfo } from './rpcFetchEpochInfo';
import { rpcFetchBlockDate } from './rpcFetchBlockDate';

export const fetchAuctionDates = async (block: bigint | null = null): Promise<AuctionDates> => {
  const [error, epochInfo] = await E.try(() => rpcFetchEpochInfo());

  if (error) {
    Log().error('Error fetching current date:', error);
    throw error;
  }

  const currentEpoch = epochInfo.epochs.find((epoch) => epoch.identifier === 'week');

  if (!currentEpoch) {
    Log().error('No current epoch found');
    throw new Error('No current epoch found');
  }

  const blockEndDate = block ? await rpcFetchBlockDate(block) : null;
  const epochDuration = parseInt(currentEpoch.duration, 10);

  /* eslint-disable no-magic-numbers */
  const start = blockEndDate ? new Date(blockEndDate.getTime() - epochDuration * 1000) : new Date(currentEpoch.current_epoch_start_time);
  const end = blockEndDate ? blockEndDate : new Date(start.getTime() + epochDuration * 1000);
  /* eslint-enable no-magic-numbers */

  Log().info('Start date:', start);
  Log().info('End date:', end);

  return {
    start,
    end,
  };
};
