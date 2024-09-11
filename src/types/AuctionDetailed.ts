// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

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
    hasPriceError: boolean;
  };
  highestBid: {
    bidInEvmos: bigint;
    bidInEvmosWithDecimals: number;
    bidInUsd: number;
    bidderAddress: HexAddress;
  };
};
