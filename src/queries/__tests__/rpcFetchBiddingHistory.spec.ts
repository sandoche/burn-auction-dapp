// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

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

/* eslint-disable no-magic-numbers */
describe('rpcFetchBiddingHistory(from, to)', async () => {
  it('should return the Bids for a given round number', async () => {
    const result = await rpcFetchBiddingHistory(BigInt(1), BigInt(3));
    expect(result).toBeDefined();
    expect(result.length).toEqual(3);
  });
});
