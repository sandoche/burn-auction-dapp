import type { Coin } from './Coin';

export type AuctionEndEvent = {
  eventName: string;
  args: {
    winner: string;
    round: bigint;
    coins?: Coin[];
    burned: bigint;
  };
  address: string;
  topics: string[];
  data: string;
  blockNumber: bigint;
  transactionHash: string;
  transactionIndex: number;
  blockHash: string;
  logIndex: number;
  removed: boolean;
};
