// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { expect, describe, it, expectTypeOf, beforeEach, afterEach, vi } from 'vitest';

import type { AuctionHistory } from '@/types/AuctionHistory';
import { EVMOS_DECIMALS } from '@/constants';

import { fetchAuctionHistory } from '../fetchAuctionHistory';
import { mockAuctionEndEvents } from './mockedData';
import * as prismaModule from '../prismaFetchAuctionEvents';

// Mock the entire module
vi.mock('../prismaFetchAuctionEvents');

// Create a typed mock of the prismaFetchAuctionEvents function
const mockPrismaFetchAuctionEvents = vi.mocked(prismaModule.prismaFetchAuctionEvents);

beforeEach(() => {
  // Reset all mocks before each test
  vi.resetAllMocks();

  // Set up the mock implementation for prismaFetchAuctionEvents
  mockPrismaFetchAuctionEvents.mockImplementation(() => Promise.resolve([]));
  mockPrismaFetchAuctionEvents.count = vi.fn().mockResolvedValue(0);
  mockPrismaFetchAuctionEvents.totalBurned = vi.fn().mockResolvedValue(0);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('fetchAuctionHistory()', () => {
  it('should return the auction history and the correct total burned amount', async () => {
    mockPrismaFetchAuctionEvents.mockResolvedValue(
      mockAuctionEndEvents.map((event) => ({
        id: 1, // Add a dummy id
        round: Number(event.args.round),
        burned: event.args.burned.toString(),
        winner: event.args.winner,
        blockNumber: event.blockNumber.toString(),
        transactionHash: '0x123...', // Add dummy values for these fields
        transactionIndex: 0,
        blockHash: '0x456...',
        logIndex: 0,
        removed: false,
        coins: [], // Add an empty coins array
        burnedWithoutDecimals: Number(BigInt(event.args.burned) / BigInt(10 ** EVMOS_DECIMALS)),
      })),
    );

    // @ts-ignore
    mockPrismaFetchAuctionEvents.count.mockResolvedValue(mockAuctionEndEvents.length);

    const expectedTotalBurned = Number(mockAuctionEndEvents.reduce((acc, event) => acc + event.args.burned, BigInt(0)) / BigInt(10 ** EVMOS_DECIMALS));

    // @ts-ignore
    mockPrismaFetchAuctionEvents.totalBurned.mockResolvedValue(expectedTotalBurned);

    const result = await fetchAuctionHistory(1, 10);

    expect(result).toBeDefined();
    expectTypeOf(result).toMatchTypeOf<AuctionHistory>();

    // Check if the history is in reverse order
    expect(result.history[0].round).toBe(BigInt(3));
    expect(result.history[1].round).toBe(BigInt(1));

    // Check if the totalItems matches the mock data length
    expect(result.totalItems).toBe(mockAuctionEndEvents.length);

    // Check if the totalBurned matches the mocked value
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
    mockPrismaFetchAuctionEvents.mockResolvedValue([]);

    const result = await fetchAuctionHistory(1, 10);

    expect(result.history).toEqual([]);
    expect(result.totalBurned).toBe(0);
  });

  it('should throw an error when prismaFetchAuctionEvent fails', async () => {
    mockPrismaFetchAuctionEvents.mockRejectedValue(new Error('Database error'));

    await expect(fetchAuctionHistory(1, 10)).rejects.toThrow('Database error');
  });

  it('should return paginated auction history', async () => {
    const mockData = mockAuctionEndEvents.map((event) => ({
      id: 1,
      round: Number(event.args.round),
      burned: event.args.burned.toString(),
      winner: event.args.winner,
      blockNumber: event.blockNumber.toString(),
      transactionHash: '0x123...',
      transactionIndex: 0,
      blockHash: '0x456...',
      logIndex: 0,
      removed: false,
      coins: [],
      burnedWithoutDecimals: Number(BigInt(event.args.burned) / BigInt(10 ** EVMOS_DECIMALS)),
    }));

    mockPrismaFetchAuctionEvents.mockResolvedValue(mockData.slice(0, 1));

    const result = await fetchAuctionHistory(1, 1);

    expect(result.history.length).toBe(1);
    expect(result.history[0].round).toBe(mockAuctionEndEvents[0].args.round);
  });

  it('should handle errors when fetching total items', async () => {
    mockPrismaFetchAuctionEvents.mockResolvedValue([]);

    // @ts-ignore
    mockPrismaFetchAuctionEvents.count.mockRejectedValue(new Error('Count error'));
    // @ts-ignore
    mockPrismaFetchAuctionEvents.totalBurned.mockResolvedValue(0);

    await expect(fetchAuctionHistory(1, 10)).rejects.toThrow('Count error');
  });

  it('should handle errors when fetching total burned', async () => {
    mockPrismaFetchAuctionEvents.mockResolvedValue([]);

    // @ts-ignore
    mockPrismaFetchAuctionEvents.count.mockResolvedValue(0);
    // @ts-ignore
    mockPrismaFetchAuctionEvents.totalBurned.mockRejectedValue(new Error('Total burned error'));

    await expect(fetchAuctionHistory(1, 10)).rejects.toThrow('Total burned error');
  });
});
