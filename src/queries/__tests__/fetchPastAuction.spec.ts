// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { expect, describe, it, expectTypeOf, beforeEach, afterEach, vi } from 'vitest';

import type { AuctionDetailed } from '@/types/AuctionDetailed';

import { fetchPastAuction } from '../fetchPastAuction';
import { mockCoinGeckoResponse, mockAuctionResponse, epochInfoResponse, mockAuctionEndEventsRound3 } from './mockedData';

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

  vi.mock('../rpcFetchAuctionEnd', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      // @ts-ignore
      ...actual,
      rpcFetchAuctionEnd: vi.fn(() => mockAuctionEndEventsRound3),
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
