// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { expect, describe, it, expectTypeOf, beforeEach, afterEach, vi } from 'vitest';

import type { AuctionEndEvent } from '@/types/AuctionEndEvent';

import { rpcFetchAuctionEnd } from '../rpcFetchAuctionEnd';
import { mockAuctionEndEvents, mockAuctionEndEventsRound3 } from './mockedData';

beforeEach(() => {
  vi.mock('../rpcFetchAuctionEnd', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      // @ts-ignore
      ...actual,
      rpcFetchAuctionEnd: vi.fn((round) => (round ? mockAuctionEndEventsRound3 : mockAuctionEndEvents)),
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

describe('rpcFetchAuctionEnd(round)', async () => {
  it('should return a specific AuctionEnd event', async () => {
    const result = await rpcFetchAuctionEnd(BigInt(3));
    expect(result).toBeDefined();
    expect(result.length).toEqual(1);
    expectTypeOf(result).toMatchTypeOf<AuctionEndEvent[]>();
  });
});
