import type { AuctionDetailed } from "@/types/AuctionDetailed";
import type { AuctionInfo } from "@/types/AuctionInfo";

// remove type null
export const rpcFetchCurrentAuctionInfo =
  async (): Promise<AuctionInfo | null> => {
    return null;
  };

// remove type any
export const fetchCurrentAuction = async (): Promise<
  AuctionDetailed | any
> => {};
