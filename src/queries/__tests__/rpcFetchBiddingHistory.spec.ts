import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest';
import { rpcFetchBiddingHistory } from '../rpcFetchBiddingHistory';
import { mockBiddingHistoryResponse } from './mockedData';

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

describe('rpcFetchBiddingHistory(round)', async () => {
  it('should return the Bids for a given round number', async () => {
    const result = await rpcFetchBiddingHistory(BigInt(1));
    expect(result).toBeDefined();
  });
});
