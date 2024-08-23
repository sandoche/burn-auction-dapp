import { HexAddress } from './HexAddress';

export type BidHistoryItem = {
  bidder: HexAddress;
  amount: bigint;
  time: Date | null;
  transactionHash: HexAddress;
  blockNumber: bigint;
};

export type BiddingHistory = BidHistoryItem[];
