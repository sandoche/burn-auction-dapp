// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { HexAddress } from './HexAddress';

export type BidHistoryItem = {
  bidder: HexAddress;
  amount: bigint;
  time: Date | null;
  transactionHash: HexAddress;
  blockNumber: bigint;
};

export type BiddingHistory = BidHistoryItem[];
