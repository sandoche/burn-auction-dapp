import type { HexAddress } from './HexAddress';
import type { AuctionnedAsset } from './AuctionnedAsset';

export type AuctionDetailed = {
  round: {
    round: bigint;
    isLast: boolean;
    startDate: Date;
    endDate: Date;
  };
  auction: {
    assets: AuctionnedAsset[];
    totalValue: number;
  };
  highestBid: {
    bidInEvmos: bigint;
    bidInEvmosWithDecimals: number;
    bidInUsd: number;
    bidderAddress: HexAddress;
  };
};
