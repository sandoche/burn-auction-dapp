// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import type { AuctionDetailed } from '@/types/AuctionDetailed';
import { E } from '@/utilities/error-handling';
import { Log } from '@/utilities/logger';
import { AuctionnedAsset } from '@/types/AuctionnedAsset';
import { fetchChainRegistryDir } from '@/utilities/fetchChainRegistryDir';
import { TokenEntity } from '@/utilities//registry/autogen/token-entity';
import { fetchCurrentCryptoPrice } from './fetchCurrentCryptoPrice';
import { rpcFetchCurrentAuctionInfo } from './rpcFetchCurrentAuctionInfo';
import { fetchAuctionDates } from './fetchAuctionDates';
import { EVMOS_DECIMALS } from '@/constants';
import { rpcFetchAuctionEnd } from './rpcFetchAuctionEnd';

export const fetchPastAuction = async (round: bigint): Promise<AuctionDetailed> => {
  const [error, auctionEndEvent] = await E.try(() => rpcFetchAuctionEnd(round));

  if (error || auctionEndEvent.length === 0) {
    Log().error('Error fetching auction end event info:', error);
    throw error;
  }

  const roundData = auctionEndEvent[0];

  const [errorMetadata, tokensMetadata] = await E.try(() => fetchChainRegistryDir<TokenEntity>('tokens'));

  if (errorMetadata || !tokensMetadata) {
    Log().error('Error fetching tokens metadata:', errorMetadata);
    throw errorMetadata;
  }

  const [errorEndDate, dates] = await E.try(() => fetchAuctionDates(roundData.blockNumber));

  if (errorEndDate || !dates) {
    Log().error('Error fetching current end date:', errorEndDate);
    throw errorEndDate;
  }

  const auctionDetails: AuctionDetailed = {
    round: {
      round: round,
      isLast: false,
      startDate: dates.start,
      endDate: dates.end,
    },
    highestBid: {
      bidInEvmos: roundData.args.burned,
      bidInEvmosWithDecimals: Number(roundData.args.burned) / 10 ** EVMOS_DECIMALS,
      bidderAddress: roundData.args.winner,
      bidInUsd: 0,
    },
    auction: {
      assets: [] as AuctionnedAsset[],
      totalValue: 0,
    },
  };

  return auctionDetails;
};
