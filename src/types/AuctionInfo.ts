import type { Coin } from "./Coin";
import type { HexAddress } from "./HexAddress";

export interface AuctionInfo {
  tokens: readonly Coin[];
  highestBid: Coin;
  currentRound: bigint;
  bidderAddress: HexAddress;
}
