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

export const fetchCurrentAuction = async (): Promise<AuctionDetailed> => {
  const [error, auctionInfo] = await E.try(() => rpcFetchCurrentAuctionInfo());

  if (error || !auctionInfo) {
    Log().error('Error fetching current auction info:', error);
    throw error;
  }

  const [errorMetadata, tokensMetadata] = await E.try(() => fetchChainRegistryDir<TokenEntity>('tokens'));

  if (errorMetadata || !tokensMetadata) {
    Log().error('Error fetching tokens metadata:', errorMetadata);
    throw errorMetadata;
  }

  const [errorEndDate, dates] = await E.try(() => fetchAuctionDates());

  if (errorEndDate || !dates) {
    Log().error('Error fetching current end date:', errorEndDate);
    throw errorEndDate;
  }

  const currentAuctionInfo = {
    round: {
      round: auctionInfo.currentRound,
      isLast: true,
      startDate: dates.start,
      endDate: dates.end,
    },
    highestBid: {
      bidInEvmos: auctionInfo.highestBid.amount,
      bidInEvmosWithDecimals: Number(auctionInfo.highestBid.amount) / 10 ** EVMOS_DECIMALS,
      bidderAddress: auctionInfo.bidderAddress,
      bidInUsd: 0,
    },
    auction: {
      assets: [] as AuctionnedAsset[],
      totalValue: 0,
    },
  };

  currentAuctionInfo.auction.assets = auctionInfo.tokens.map((token) => {
    const tokenMetadata = tokensMetadata.find((metadata) => metadata.minCoinDenom === token.denom);

    // TODO: handle the case where the token is not found
    if (!tokenMetadata) {
      return {
        coingeckoId: '',
        denom: token.denom,
        name: 'Unknown Token',
        ticker: '',
        amount: token.amount,
        valueInUsd: 0,
        iconUrl: '',
        exponent: 0,
        amountWithDecimals: 0,
      };
    }

    return {
      coingeckoId: tokenMetadata.coingeckoId,
      denom: token.denom,
      name: tokenMetadata.name,
      ticker: tokenMetadata.coinDenom,
      amount: token.amount,
      valueInUsd: 0,
      iconUrl: tokenMetadata.img.svg ?? tokenMetadata.img.png,
      exponent: Number(tokenMetadata.exponent),
      amountWithDecimals: Number(token.amount) / 10 ** Number(tokenMetadata.exponent),
    };
  });

  const coingeckoIds = currentAuctionInfo.auction.assets.map((asset) => asset.coingeckoId);
  coingeckoIds.push('evmos');

  const [_, prices] = await E.try(() => fetchCurrentCryptoPrice(coingeckoIds));

  Log().info('Prices:', prices);

  if (prices) {
    currentAuctionInfo.auction.assets = currentAuctionInfo.auction.assets.map((asset) => {
      if (!asset.coingeckoId) {
        return asset;
      }

      asset.valueInUsd = prices[asset.coingeckoId]['usd'] * Number(asset.amountWithDecimals);

      return asset;
    });

    currentAuctionInfo.highestBid.bidInUsd = currentAuctionInfo.highestBid.bidInEvmosWithDecimals * prices['evmos']['usd'];
  }

  currentAuctionInfo.auction.totalValue = currentAuctionInfo.auction.assets.reduce((acc, asset) => acc + asset.valueInUsd, 0);

  Log().info('Current auction info:', currentAuctionInfo);
  Log().info('Assets detailed:', currentAuctionInfo.auction.assets);

  return currentAuctionInfo;
};
