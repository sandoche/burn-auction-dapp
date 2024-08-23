import { HexAddress } from './HexAddress';

export type AuctionHistoryItem = {
  round: bigint;
  amountInEvmos: bigint;
  winnerAddress: HexAddress;
  blockNumber: bigint;
};

export type AuctionHistory = {
  history: AuctionHistoryItem[];
  totalBurned: bigint;
};
