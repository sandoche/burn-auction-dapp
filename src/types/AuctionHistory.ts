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
