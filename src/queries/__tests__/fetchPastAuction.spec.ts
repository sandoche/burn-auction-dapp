// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { expect, describe, it, expectTypeOf, beforeEach, afterEach, vi } from 'vitest';
import { fetchPastAuction } from '../fetchPastAuction';
import type { AuctionInfo } from '@/types/AuctionInfo';
import type { AuctionDetailed } from '@/types/AuctionDetailed';
import { mockCoinGeckoResponse, mockAuctionResponse } from './mockedData';
import { epochInfoResponse } from './mockedData';

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

  vi.mock('../rpcFetchEpochInfo', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      // @ts-ignore
      ...actual,
      rpcFetchEpochInfo: vi.fn(() => epochInfoResponse),
    };
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('fetchPastAuction(5)', async () => {
  it('should return the current auction info of type AuctionDetailed', async () => {
    const result = await fetchPastAuction(BigInt(40));
    expect(result).toBeDefined();
    expectTypeOf(result).toMatchTypeOf<AuctionDetailed>();
  });
});
