// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { expect, describe, it, expectTypeOf, beforeEach, afterEach, vi } from 'vitest';
import { fetchAuctionHistory } from '../fetchAuctionHistory';
import type { AuctionHistory } from '@/types/AuctionHistory';
import { mockAuctionEndEvents } from './mockedData';

beforeEach(() => {
  vi.mock('../rpcFetchAuctionEnd', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      // @ts-ignore
      ...actual,
      rpcFetchAuctionEnd: vi.fn(() => mockAuctionEndEvents),
    };
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('fetchAuctionHistory()', async () => {
  it('should return the auction history and the total', async () => {
    const result = await fetchAuctionHistory();
    expect(result).toBeDefined();
    expectTypeOf(result).toMatchTypeOf<AuctionHistory>();
  });
});
