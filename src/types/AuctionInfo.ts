import type { Coin } from "./Coin";
import type { HexAddress } from "./HexAddress";

export interface AuctionInfo {
  tokens: Coin[];
  highestBid: Coin;
  currentRound: number;
  bidderAddress: HexAddress;
}
