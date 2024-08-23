import { expect, describe, it, expectTypeOf, beforeEach, afterEach, vi } from 'vitest';
import { rpcFetchEpochInfo } from '../rpcFetchEpochInfo';
import { EpochResponse } from '@/types/EpochInfo';
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
