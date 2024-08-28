// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { HexAddress } from './HexAddress';

export type BidEvent = {
  eventName: string;
  args: {
    sender: HexAddress;
    round: bigint;
    amount: bigint;
  };
  address: HexAddress;
  topics: HexAddress[];
  data: string;
  blockNumber: bigint;
  transactionHash: HexAddress;
  transactionIndex: number;
  blockHash: HexAddress;
  logIndex: number;
  removed: boolean;
};
