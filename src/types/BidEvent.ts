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
