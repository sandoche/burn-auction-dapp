// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import type { Coin } from './Coin';
import { HexAddress } from './HexAddress';

export type AuctionEndEvent = {
  eventName: string;
  args: {
    winner: HexAddress;
    round: bigint;
    coins?: Coin[];
    burned: bigint;
  };
  address: HexAddress;
  topics: HexAddress[];
  data: string;
  blockNumber: bigint;
  transactionHash: string;
  transactionIndex: number;
  blockHash: HexAddress;
  logIndex: number;
  removed: boolean;
};
