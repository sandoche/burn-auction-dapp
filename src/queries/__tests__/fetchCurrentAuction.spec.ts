import { expect, describe, it, expectTypeOf, beforeEach, afterEach, vi } from 'vitest';
import { rpcFetchCurrentAuctionInfo, fetchCurrentAuction } from '../fetchCurrentAuction';
import { AuctionInfo } from '@/types/AuctionInfo';
import { AuctionDetailed } from '@/types/AuctionDetailed';

beforeEach(() => {
  vi.mock('../fetchCurrentCryptoPrice', async (importOriginal) => {
    const actual = await importOriginal();

    return {
      // @ts-ignore
      ...actual,
      fetchCurrentCryptoPrice: vi.fn(() => {
        return {
          cosmos: {
            usd: 5.9,
          },
        };
      }),
    };
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

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
