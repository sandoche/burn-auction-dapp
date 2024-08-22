import type { AuctionDetailed } from '@/types/AuctionDetailed';
import type { AuctionInfo } from '@/types/AuctionInfo';
import { viemClient } from '@/utilities/viem';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/contract';
import { E } from '@/utilities/error-handling';
import { Log } from '@/utilities/logger';
import { AuctionnedAsset } from '@/types/AuctionnedAsset';
import { fetchChainRegistryDir } from '@/utilities/fetchChainRegistryDir';
import { TokenEntity } from '@/utilities//registry/autogen/token-entity';
import { fetchCurrentCryptoPrice } from './fetchCurrentCryptoPrice';

export const rpcFetchCurrentAuctionInfo = async (): Promise<AuctionInfo> => {
  const [error, result] = await E.try(() =>
    viemClient.readContract({
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

  const currentAuctionInfo = {
    round: {
      round: auctionInfo.currentRound,
      isLast: true,
      endTime: new Date(), // TODO: fix the end date with the real one
    },
    highestBid: {
      bidInEvmos: auctionInfo.highestBid.amount,
      bidderAddress: auctionInfo.bidderAddress,
      bidInUsd: 0,
    },
    auction: {
      assets: [] as AuctionnedAsset[],
      totalValue: 0, // TODO: fix the total value
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
    };
  });

  const coingeckoIds = currentAuctionInfo.auction.assets.map((asset) => asset.coingeckoId);
  const [_, prices] = await E.try(() => fetchCurrentCryptoPrice(coingeckoIds));

  Log().info('Prices:', prices);

  if (prices) {
    currentAuctionInfo.auction.assets = currentAuctionInfo.auction.assets.map((asset) => {
      if (!asset.coingeckoId) {
        return asset;
      }

      // TODO: decimals are not handled yet
      asset.valueInUsd = prices[asset.coingeckoId]['usd'] * Number(asset.amount);

      return asset;
    });
  }

  currentAuctionInfo.auction.totalValue = currentAuctionInfo.auction.assets.reduce((acc, asset) => acc + asset.valueInUsd, 0);

  return currentAuctionInfo;
};
