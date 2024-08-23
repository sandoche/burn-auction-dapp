import { HexAddress } from './HexAddress';

export type BidHistoryItem = {
  bidder: HexAddress;
  amount: bigint;
  time: Date;
  transactionHash: HexAddress;
};

export type BiddingHistory = BidHistoryItem[];
