import type { Coin } from './Coin';
import type { HexAddress } from './HexAddress';

export type AuctionInfo = {
  tokens: readonly Coin[];
  highestBid: Coin;
  currentRound: bigint;
  bidderAddress: HexAddress;
};
