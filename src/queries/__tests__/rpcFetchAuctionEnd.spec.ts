// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { expect, describe, it, expectTypeOf, beforeEach, afterEach, vi } from 'vitest';
import { rpcFetchAuctionEnd } from '../rpcFetchAuctionEnd';
import type { AuctionEndEvent } from '@/types/AuctionEndEvent';
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

describe('rpcFetchAuctionEnd()', async () => {
  it('should return all the AuctionEnd events', async () => {
    const result = await rpcFetchAuctionEnd();
    expect(result).toBeDefined();
    expectTypeOf(result).toMatchTypeOf<AuctionEndEvent[]>();
  });
});
