// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { expect, describe, it, expectTypeOf, beforeEach, afterEach, vi } from 'vitest';

import { fetchAuctionDates } from '../fetchAuctionDates';
import { epochInfoResponse } from './mockedData';

beforeEach(() => {
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

describe('fetchAuctionDates()', async () => {
  it('should return the start and end dates', async () => {
    const result = await fetchAuctionDates();
    expect(result).not.toBeNull();
    expectTypeOf(result.start).toMatchTypeOf<Date>();
    expectTypeOf(result.end).toMatchTypeOf<Date>();
    expect(result.start).toBeInstanceOf(Date);
    expect(result.end).toBeInstanceOf(Date);
    expect(result.start.getTime()).toBeLessThan(result.end.getTime());
  });
});
