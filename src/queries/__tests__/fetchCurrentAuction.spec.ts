import { expect, describe, it, expectTypeOf, beforeEach, afterEach, vi } from 'vitest';
import { fetchCurrentAuction } from '../fetchCurrentAuction';
import { rpcFetchCurrentAuctionInfo } from '../rpcFetchCurrentAuctionInfo';
import { AuctionInfo } from '@/types/AuctionInfo';
import { AuctionDetailed } from '@/types/AuctionDetailed';

const mockCoinGeckoResponse = {
  cosmos: {
    usd: 5.9,
  },
  'wrapped-bitcoin': {
    usd: 70000,
  },
};

const mockAuctionResponse: AuctionInfo = {
  tokens: [
    { denom: 'uatom', amount: BigInt(10000000) },
    { denom: 'wbtc-satoshi', amount: BigInt(10000000) },
  ],
  highestBid: { denom: 'aevmos', amount: BigInt(0) },
  currentRound: BigInt(100),
  bidderAddress: '0x0000000000000000000000000000000000000000',
};

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
