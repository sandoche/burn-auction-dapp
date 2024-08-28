// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { HexAddress } from './HexAddress';

export type HistoryItem = {
  round: bigint;
  amountInEvmos: bigint;
  winnerAddress: HexAddress;
  blockNumber: bigint;
};

export type AuctionHistory = {
  history: HistoryItem[];
  totalBurned: bigint;
};
