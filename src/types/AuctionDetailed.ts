import type { HexAddress } from './HexAddress';
import type { AuctionnedAsset } from './AuctionnedAsset';

export type AuctionDetailed = {
  round: {
    round: bigint;
    isLast: boolean;
    endTime: Date;
  };
  auction: {
    assets: AuctionnedAsset[];
    totalValue: number;
  };
  highestBid: {
    bidInEvmos: bigint;
    bidInUsd: number;
    bidderAddress: HexAddress;
  };
};
