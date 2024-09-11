// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { expect, describe, it, expectTypeOf, beforeEach, afterEach, vi } from 'vitest';

import { EpochResponse } from '@/types/EpochInfo';

import { rpcFetchEpochInfo } from '../rpcFetchEpochInfo';
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

describe('rpcFetchEpochInfo()', async () => {
  it('should return the current epoch info of type EpochResponse', async () => {
    const result = await rpcFetchEpochInfo();
    expect(result).toBeDefined();
    expectTypeOf(result).toMatchTypeOf<EpochResponse>();
  });
});
