import { expect, describe, it, expectTypeOf, beforeEach, afterEach, vi } from 'vitest';
import { rpcFetchCurrentAuctionInfo } from '../rpcFetchCurrentAuctionInfo';
import { AuctionInfo } from '@/types/AuctionInfo';
import { mockAuctionResponse } from './mockedData';

beforeEach(() => {
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
    console.log(result);
    expect(result).toBeDefined();
    expectTypeOf(result).toMatchTypeOf<AuctionInfo>();
  });
});
