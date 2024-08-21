import type { HexAddress } from "./HexAddress";
import type { AuctionnedAsset } from "./AuctionnedAsset";

export type AuctionDetailed = {
  round: {
    round: number;
    isLast: boolean;
    endTime: Date;
  };
  auction: {
    assets: AuctionnedAsset[];
    totalValue: number;
  };
  highestBid: {
    bidInEvmos: number;
    bidInUsd: number;
    bidderAddress: HexAddress;
  };
};
