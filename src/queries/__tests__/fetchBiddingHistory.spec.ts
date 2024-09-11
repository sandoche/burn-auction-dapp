// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { expect, describe, it, expectTypeOf, beforeEach, afterEach, vi } from 'vitest';

import type { BiddingHistory } from '@/types/BiddingHistory';

import { fetchBiddingHistory } from '../fetchBiddingHistory';
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

describe('fetchBiddingHistory(round)', async () => {
  it('should return the bidding history of a given round', async () => {
    const result = await fetchBiddingHistory(BigInt(1));
    expect(result).toBeDefined();
    expectTypeOf(result).toMatchTypeOf<BiddingHistory>();
  });
});
