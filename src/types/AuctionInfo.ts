// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import type { Coin } from './Coin';
import type { HexAddress } from './HexAddress';

export type AuctionInfo = {
  tokens: readonly Coin[];
  highestBid: Coin;
  currentRound: bigint;
  bidderAddress: HexAddress;
};
