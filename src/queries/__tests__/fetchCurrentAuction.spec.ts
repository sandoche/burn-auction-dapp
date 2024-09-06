// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { expect, describe, it, expectTypeOf, beforeEach, afterEach, vi } from 'vitest';
import { fetchCurrentAuction } from '../fetchCurrentAuction';
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

describe('fetchCurrentAuction()', async () => {
  it('should return the current auction info of type AuctionDetailed', async () => {
    const result = await fetchCurrentAuction();
    expect(result).toBeDefined();
    expectTypeOf(result).toMatchTypeOf<AuctionDetailed>();
  });
});
