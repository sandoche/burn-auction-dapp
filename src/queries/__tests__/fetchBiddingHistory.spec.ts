// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { expect, describe, it, expectTypeOf, beforeEach, afterEach, vi } from 'vitest';
import { fetchBiddingHistory } from '../fetchBiddingHistory';
import type { BiddingHistory } from '@/types/BiddingHistory';
import { prismaFetchBidEvent } from '../prismaFetchBidEvent';
import { rpcFetchBlockDate } from '../rpcFetchBlockDate';

vi.mock('../prismaFetchBidEvent');
vi.mock('../rpcFetchBlockDate');

describe('fetchBiddingHistory(round)', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return the bidding history of a given round', async () => {
    const mockPrismaResponse = [
      {
        id: 1,
        sender: '0xC6Fe5D33615a1C52c08018c47E8Bc53646A0E101',
        round: '1',
        amount: '19999999999999800',
        blockNumber: '1212',
        transactionHash: '0x72498be6d89a6c6696ffcb13a62b32fcafe82b1c1c7c7e2b37cdc2c574edcf56',
        transactionIndex: 0,
        blockHash: '0x1234567890abcdef',
        logIndex: 0,
        removed: false,
      },
      {
        id: 2,
        sender: '0xC6Fe5D33615a1C52c08018c47E8Bc53646A0E101',
        round: '1',
        amount: '199999999999998000',
        blockNumber: '1231',
        transactionHash: '0xc90cd222f15b803faa699ce3fd7e31daa5eb2e99d1c25856c841c217a3214989',
        transactionIndex: 1,
        blockHash: '0x9876543210fedcba',
        logIndex: 1,
        removed: false,
      },
    ];

    vi.mocked(prismaFetchBidEvent).mockResolvedValue(mockPrismaResponse);
    vi.mocked(rpcFetchBlockDate).mockResolvedValue(new Date('2023-04-01T12:00:00Z'));

    const result = await fetchBiddingHistory(BigInt(1));

    expect(result).toBeDefined();
    expectTypeOf(result).toMatchTypeOf<BiddingHistory>();
    expect(result.length).toBe(2);
    expect(result[0]).toEqual({
      bidder: '0xC6Fe5D33615a1C52c08018c47E8Bc53646A0E101',
      amount: BigInt('199999999999998000'),
      time: new Date('2023-04-01T12:00:00Z'),
      transactionHash: '0xc90cd222f15b803faa699ce3fd7e31daa5eb2e99d1c25856c841c217a3214989',
      blockNumber: BigInt(1231),
    });
  });

  it('should handle empty bidding history', async () => {
    vi.mocked(prismaFetchBidEvent).mockResolvedValue([]);

    const result = await fetchBiddingHistory(BigInt(1));

    expect(result).toBeDefined();
    expectTypeOf(result).toMatchTypeOf<BiddingHistory>();
    expect(result.length).toBe(0);
  });

  it('should throw an error if prismaFetchBidEvent fails', async () => {
    vi.mocked(prismaFetchBidEvent).mockRejectedValue(new Error('Database error'));

    await expect(fetchBiddingHistory(BigInt(1))).rejects.toThrow('Database error');
  });

  it('should handle rpcFetchBlockDate failure gracefully', async () => {
    const mockPrismaResponse = [
      {
        id: 1,
        sender: '0xC6Fe5D33615a1C52c08018c47E8Bc53646A0E101',
        round: '1',
        amount: '19999999999999800',
        blockNumber: '1212',
        transactionHash: '0x72498be6d89a6c6696ffcb13a62b32fcafe82b1c1c7c7e2b37cdc2c574edcf56',
        transactionIndex: 0,
        blockHash: '0x1234567890abcdef',
        logIndex: 0,
        removed: false,
      },
    ];

    vi.mocked(prismaFetchBidEvent).mockResolvedValue(mockPrismaResponse);

    const result = await fetchBiddingHistory(BigInt(1));

    expect(result).toBeDefined();
    expectTypeOf(result).toMatchTypeOf<BiddingHistory>();
    expect(result.length).toBe(1);
    expect(result[0].time).toBeNull();
  });
});
