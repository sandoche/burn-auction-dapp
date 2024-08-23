import { expect, describe, it, expectTypeOf, beforeEach, afterEach, vi } from 'vitest';
import { fetchCurrentAuction } from '../fetchCurrentAuction';
import { rpcFetchCurrentAuctionInfo } from '../rpcFetchCurrentAuctionInfo';
import type { AuctionInfo } from '@/types/AuctionInfo';
import type { AuctionDetailed } from '@/types/AuctionDetailed';
import { mockCoinGeckoResponse, mockAuctionResponse } from './mockedData';

beforeEach(() => {
  vi.mock('../fetchCurrentCryptoPrice', async (importOriginal) => {
    const actual = await importOriginal();

    return {
      // @ts-ignore
      ...actual,
      fetchCurrentCryptoPrice: vi.fn(() => mockCoinGeckoResponse),
    };
  });

  vi.mock('../rpcFetchCurrentAuctionInfo', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      // @ts-ignore
      ...actual,
      rpcFetchCurrentAuctionInfo: vi.fn(() => mockAuctionResponse),
    };
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('rpcFetchCurrentAuctionInfo()', async () => {
  it('should return the current auction info of type AuctionInfo', async () => {
    const result = await rpcFetchCurrentAuctionInfo();
    expect(result).toBeDefined();
    expectTypeOf(result).toMatchTypeOf<AuctionInfo>();
  });
});

describe('fetchCurrentAuction()', async () => {
  it('should return the current auction info of type AuctionDetailed', async () => {
    const result = await fetchCurrentAuction();
    expect(result).toBeDefined();
    expectTypeOf(result).toMatchTypeOf<AuctionDetailed>();
  });
});
