import { expect, describe, it, expectTypeOf } from "vitest";
import { rpcFetchCurrentAuctionInfo } from "../fetchCurrentAuction";
import { AuctionInfo } from "@/types/AuctionInfo";

describe("rpcFetchCurrentAuctionInfo()", async () => {
  it("should return the current auction info of type AuctionInfo", async () => {
    const result = await rpcFetchCurrentAuctionInfo();
    expect(result).toBeDefined();
    expectTypeOf(result).toMatchTypeOf<AuctionInfo>();
  });
});
