import type { AuctionDetailed } from '@/types/AuctionDetailed';
import type { AuctionInfo } from '@/types/AuctionInfo';
import { viemClient } from '@/utilities/viem';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/contract';
import { E } from '@/utilities/error-handling';
import { Log } from '@/utilities/logger';
import { AuctionnedAsset } from '@/types/AuctionnedAsset';

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

  if (error && !auctionInfo) {
    Log().error('Error fetching current auction info:', error);
    throw error;
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
    currentAuctionInfo.auction.totalValue += 0; // TO UPDATE

    return {
      denom: token.denom,
      name: '',
      ticker: '',
      amount: token.amount,
      valueInUsd: 0,
      iconUrl: '',
    };
  });

  return currentAuctionInfo;
};
