// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { expect, describe, it, expectTypeOf, beforeEach, afterEach, vi } from 'vitest';
import { fetchAuctionHistory } from '../fetchAuctionHistory';
import type { AuctionHistory } from '@/types/AuctionHistory';
import { mockAuctionEndEvents } from './mockedData';
import { prismaFetchAuctionEvent } from '../prismaFetchAuctionEvent';

vi.mock('../prismaFetchAuctionEvent');

beforeEach(() => {
  vi.mocked(prismaFetchAuctionEvent).mockReset();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('fetchAuctionHistory()', () => {
  it('should return the auction history and the correct total burned amount', async () => {
    vi.mocked(prismaFetchAuctionEvent).mockResolvedValue(
      mockAuctionEndEvents.map((event) => ({
        id: 1, // Add a dummy id
        round: event.args.round.toString(),
        burned: event.args.burned.toString(),
        winner: event.args.winner,
        blockNumber: event.blockNumber.toString(),
        transactionHash: '0x123...', // Add dummy values for these fields
        transactionIndex: 0,
        blockHash: '0x456...',
        logIndex: 0,
        removed: false,
        coins: [], // Add an empty coins array
      })),
    );

    const result = await fetchAuctionHistory();

    expect(result).toBeDefined();
    expectTypeOf(result).toMatchTypeOf<AuctionHistory>();

    // Check if the history is in reverse order
    expect(result.history[0].round).toBe(BigInt(3));
    expect(result.history[1].round).toBe(BigInt(1));

    // Calculate the expected total burned amount
    const expectedTotalBurned = mockAuctionEndEvents.reduce((acc, event) => acc + event.args.burned, BigInt(0));

    // Check if the totalBurned matches the sum of all burned amounts
    expect(result.totalBurned).toBe(expectedTotalBurned);

    // Check if the history length matches the mock data
    expect(result.history.length).toBe(mockAuctionEndEvents.length);

    // Check if the first history item matches the mock data
    const firstHistoryItem = result.history[0];
    const lastMockEvent = mockAuctionEndEvents[mockAuctionEndEvents.length - 1];

    expect(firstHistoryItem.round).toBe(lastMockEvent.args.round);
    expect(firstHistoryItem.amountInEvmos).toBe(lastMockEvent.args.burned);
    expect(firstHistoryItem.winnerAddress).toBe(lastMockEvent.args.winner);
    expect(firstHistoryItem.blockNumber).toBe(lastMockEvent.blockNumber);
  });

  it('should return an empty history and zero total burned amount when there are no events', async () => {
    vi.mocked(prismaFetchAuctionEvent).mockResolvedValue([]);

    const result = await fetchAuctionHistory();

    expect(result.history).toEqual([]);
    expect(result.totalBurned).toBe(BigInt(0));
  });

  it('should handle very large burned amounts without losing precision', async () => {
    const largeAmount = BigInt('1' + '0'.repeat(50)); // 1 followed by 50 zeros
    vi.mocked(prismaFetchAuctionEvent).mockResolvedValue([
      {
        round: '1',
        burned: largeAmount.toString(),
        winner: '0x1234567890123456789012345678901234567890',
        blockNumber: '1000',
        coins: [], // Add this line
        // Add other required properties
        id: 1,
        transactionHash: '0x123...',
        transactionIndex: 0,
        blockHash: '0x456...',
        logIndex: 0,
        removed: false,
      },
    ]);

    const result = await fetchAuctionHistory();

    expect(result.history[0].amountInEvmos).toBe(largeAmount);
    expect(result.totalBurned).toBe(largeAmount);
  });

  it('should throw an error when prismaFetchAuctionEvent fails', async () => {
    vi.mocked(prismaFetchAuctionEvent).mockRejectedValue(new Error('Database error'));

    await expect(fetchAuctionHistory()).rejects.toThrow('Database error');
  });
});
