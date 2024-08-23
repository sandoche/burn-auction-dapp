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
