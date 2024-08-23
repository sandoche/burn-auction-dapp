import { expect, describe, it, expectTypeOf, beforeEach, afterEach, vi } from 'vitest';
import { fetchBiddingHistory } from '../fetchBiddingHistory';
import { mockBiddingHistoryResponse } from './mockedData';
import type { BiddingHistory } from '@/types/BiddingHistory';

beforeEach(() => {
  vi.mock('../rpcFetchBiddingHistory', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      // @ts-ignore
      ...actual,
      rpcFetchBiddingHistory: vi.fn(() => mockBiddingHistoryResponse),
    };
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('fetchBiddingHistory(round)', async () => {
  it('should return the bidding history of a given round', async () => {
    const result = await fetchBiddingHistory(BigInt(1));
    expect(result).toBeDefined();
    expectTypeOf(result).toMatchTypeOf<BiddingHistory>();
  });
});
