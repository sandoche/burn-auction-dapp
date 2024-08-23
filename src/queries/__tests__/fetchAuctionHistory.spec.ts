import { expect, describe, it, expectTypeOf, beforeEach, afterEach, vi } from 'vitest';
import { fetchAuctionHistory } from '../fetchAuctionHistory';
import { mockBiddingHistoryResponse } from './mockedData';
import type { AuctionHistory } from '@/types/AuctionHistory';

// beforeEach(() => {
//   vi.mock('../rpcFetchAuctionEnd', async (importOriginal) => {
//     const actual = await importOriginal();
//     return {
//       // @ts-ignore
//       ...actual,
//       rpcFetchAuctionEnd: vi.fn(() => { }),
//     };
//   });
// });

// afterEach(() => {
//   vi.clearAllMocks();
// });

describe('fetchAuctionHistory()', async () => {
  it('should return the auction history and the total', async () => {
    const result = await fetchAuctionHistory();
    expect(result).toBeDefined();
    expectTypeOf(result).toMatchTypeOf<AuctionHistory>();
  });
});
