import { expect, describe, it, expectTypeOf, beforeEach, afterEach, vi } from 'vitest';
import { rpcFetchAuctionEnd } from '../rpcFetchAuctionEnd';
import { EpochResponse } from '@/types/EpochInfo';

// beforeEach(() => {
//   vi.mock('../rpcFetchAuctionEnd', async (importOriginal) => {
//     const actual = await importOriginal();
//     return {
//       // @ts-ignore
//       ...actual,
//       rpcFetchAuctionEnd: vi.fn(() => {}),
//     };
//   });
// });

// afterEach(() => {
//   vi.clearAllMocks();
// });

describe('rpcFetchAuctionEnd()', async () => {
  it('should return all the AuctionEnd events', async () => {
    const result = await rpcFetchAuctionEnd();
    expect(result).toBeDefined();
    expectTypeOf(result).toMatchTypeOf<any>();
  });
});
