import { expect, describe, it, expectTypeOf } from 'vitest';
import { rpcFetchCurrentAuctionInfo, fetchCurrentAuction } from '../fetchCurrentAuction';
import { AuctionInfo } from '@/types/AuctionInfo';
import { AuctionDetailed } from '@/types/AuctionDetailed';

describe('rpcFetchCurrentAuctionInfo()', async () => {
  it('should return the current auction info of type AuctionInfo', async () => {
    const result = await rpcFetchCurrentAuctionInfo();
    console.log(result);
    expect(result).toBeDefined();
    expectTypeOf(result).toMatchTypeOf<AuctionInfo>();
  });
});

describe('fetchCurrentAuction()', async () => {
  it('should return the current auction info of type AuctionDetailed', async () => {
    const result = await fetchCurrentAuction();
    console.log(result);
    expect(result).toBeDefined();
    expectTypeOf(result).toMatchTypeOf<AuctionDetailed>();
  });
});
