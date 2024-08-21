import type { AuctionDetailed } from "@/types/AuctionDetailed";
import type { AuctionInfo } from "@/types/AuctionInfo";

import { viemClient } from "@/utilities/viem";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/contract";

export const rpcFetchCurrentAuctionInfo = async (): Promise<AuctionInfo> => {
  try {
    const result = await viemClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "auctionInfo",
    });

    console.log("Query result:", result);
    return result;
  } catch (error) {
    console.error("Error querying contract:", error);
    throw error;
  }
};

// remove type any
export const fetchCurrentAuction = async (): Promise<AuctionDetailed | any> => {};
