// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { expect, describe, it, expectTypeOf, beforeEach, afterEach, vi } from 'vitest';

import type { AuctionDetailed } from '@/types/AuctionDetailed';
import { fetchChainRegistryDir } from '@/utilities/fetchChainRegistryDir';
import { EVMOS_DECIMALS } from '@/constants';

import { fetchPastAuction } from '../fetchPastAuction';
import { prismaFetchAuctionEvent } from '../prismaFetchAuctionEvent';
import { fetchAuctionDates } from '../fetchAuctionDates';
import { fetchPastCryptoPrice } from '../fetchPastCryptoPrice';

vi.mock('../prismaFetchAuctionEvent');
vi.mock('../fetchAuctionDates');
vi.mock('../fetchPastCryptoPrice');
vi.mock('@/utilities/fetchChainRegistryDir');

beforeEach(() => {
  vi.mocked(prismaFetchAuctionEvent).mockReset();
  vi.mocked(fetchAuctionDates).mockReset();
  vi.mocked(fetchPastCryptoPrice).mockReset();
  vi.mocked(fetchChainRegistryDir).mockReset();
});

afterEach(() => {
  vi.clearAllMocks();
});

/* eslint-disable no-magic-numbers */
describe('fetchPastAuction()', () => {
  it('should return the past auction info of type AuctionDetailed', async () => {
    const mockAuctionEvent = {
      id: 1,
      round: 3,
      burned: '1000000000000000000',
      winner: '0x1234567890123456789012345678901234567890',
      blockNumber: '1000',
      transactionHash: '0x123...',
      transactionIndex: 0,
      blockHash: '0x456...',
      logIndex: 0,
      removed: false,
      coins: [
        { denom: 'uatom', amount: '1000000', id: 1, auctionEndEventId: 1 },
        { denom: 'wbtc-satoshi', amount: '100000000', id: 2, auctionEndEventId: 1 },
      ],
      burnedWithoutDecimals: Number(BigInt(1000000000000000000) / BigInt(10 ** EVMOS_DECIMALS)),
    };

    vi.mocked(prismaFetchAuctionEvent).mockResolvedValue([
      {
        ...mockAuctionEvent,
        // @ts-ignore
        coins: mockAuctionEvent.coins.map((coin) => ({
          ...coin,
          id: 1,
          auctionEndEventId: 1,
        })),
      },
    ]);
    vi.mocked(fetchAuctionDates).mockResolvedValue({
      start: new Date('2023-01-01T00:00:00Z'),
      end: new Date('2023-01-08T00:00:00Z'),
    });
    vi.mocked(fetchPastCryptoPrice).mockResolvedValue(10);
    vi.mocked(fetchChainRegistryDir).mockResolvedValue([
      {
        minCoinDenom: 'uatom',
        coingeckoId: 'cosmos',
        name: 'Cosmos',
        coinDenom: 'ATOM',
        exponent: '6',
        img: { svg: 'atom.svg', png: 'atom.png' },
      },
      {
        minCoinDenom: 'wbtc-satoshi',
        coingeckoId: 'wrapped-bitcoin',
        name: 'Wrapped Bitcoin',
        coinDenom: 'WBTC',
        exponent: '8',
        img: { svg: 'wbtc.svg', png: 'wbtc.png' },
      },
    ]);

    const result = await fetchPastAuction(BigInt(3));

    expect(result).toBeDefined();
    expectTypeOf(result).toMatchTypeOf<AuctionDetailed>();

    expect(result.round.round).toBe(BigInt(3));
    expect(result.round.isLast).toBe(false);
    expect(result.round.startDate).toEqual(new Date('2023-01-01T00:00:00Z'));
    expect(result.round.endDate).toEqual(new Date('2023-01-08T00:00:00Z'));

    expect(result.highestBid.bidInEvmos).toBe(BigInt('1000000000000000000'));
    expect(result.highestBid.bidInEvmosWithDecimals).toBe(1);
    expect(result.highestBid.bidInUsd).toBe(10);
    expect(result.highestBid.bidderAddress).toBe('0x1234567890123456789012345678901234567890');

    expect(result.auction.assets.length).toBe(2);
    expect(result.auction.assets[0].denom).toBe('uatom');
    expect(result.auction.assets[0].amount).toBe(BigInt('1000000'));
    expect(result.auction.assets[0].amountWithDecimals).toBe(1);
    expect(result.auction.assets[0].valueInUsd).toBe(10);

    expect(result.auction.assets[1].denom).toBe('wbtc-satoshi');
    expect(result.auction.assets[1].amount).toBe(BigInt('100000000'));
    expect(result.auction.assets[1].amountWithDecimals).toBe(1);
    expect(result.auction.assets[1].valueInUsd).toBe(10);

    expect(result.auction.totalValue).toBe(20);
  });

  it('should handle unknown tokens correctly', async () => {
    const mockAuctionEvent = {
      id: 1,
      round: 4,
      burned: '2000000000000000000',
      winner: '0x1234567890123456789012345678901234567890',
      blockNumber: '2000',
      transactionHash: '0x789...',
      transactionIndex: 0,
      blockHash: '0xabc...',
      logIndex: 0,
      removed: false,
      coins: [{ denom: 'unknown-token', amount: '1000000' }],
      burnedWithoutDecimals: Number(BigInt(2000000000000000000) / BigInt(10 ** EVMOS_DECIMALS)),
    };

    vi.mocked(prismaFetchAuctionEvent).mockResolvedValue([
      {
        ...mockAuctionEvent,
        // @ts-ignore
        coins: mockAuctionEvent.coins.map((coin) => ({
          ...coin,
          id: 1,
          auctionEndEventId: 1,
        })),
      },
    ]);
    vi.mocked(fetchAuctionDates).mockResolvedValue({
      start: new Date('2023-02-01T00:00:00Z'),
      end: new Date('2023-02-08T00:00:00Z'),
    });
    vi.mocked(fetchPastCryptoPrice).mockResolvedValue(20);
    vi.mocked(fetchChainRegistryDir).mockResolvedValue([]);

    const result = await fetchPastAuction(BigInt(4));

    expect(result.auction.assets.length).toBe(1);
    expect(result.auction.assets[0].denom).toBe('unknown-token');
    expect(result.auction.assets[0].amount).toBe(BigInt('1000000'));
    expect(result.auction.assets[0].valueInUsd).toBe(0);
    expect(result.auction.totalValue).toBe(0);
  });

  it('should throw an error when prismaFetchAuctionEvent returns no events', async () => {
    vi.mocked(prismaFetchAuctionEvent).mockResolvedValue([]);

    await expect(fetchPastAuction(BigInt(5))).rejects.toThrow('No coins found in the auction end event');
  });

  it('should throw an error when fetchChainRegistryDir fails', async () => {
    const mockAuctionEvent = {
      id: 1,
      round: 6,
      burned: '3000000000000000000',
      winner: '0x1234567890123456789012345678901234567890',
      blockNumber: '3000',
      transactionHash: '0xdef...',
      transactionIndex: 0,
      blockHash: '0xghi...',
      logIndex: 0,
      removed: false,
      coins: [{ denom: 'uatom', amount: '1000000' }],
      burnedWithoutDecimals: Number(BigInt(3000000000000000000) / BigInt(10 ** EVMOS_DECIMALS)),
    };

    vi.mocked(prismaFetchAuctionEvent).mockResolvedValue([
      {
        ...mockAuctionEvent,
        // @ts-ignore
        coins: mockAuctionEvent.coins.map((coin) => ({
          ...coin,
          id: 1,
          auctionEndEventId: 1,
        })),
      },
    ]);
    vi.mocked(fetchAuctionDates).mockResolvedValue({
      start: new Date('2023-03-01T00:00:00Z'),
      end: new Date('2023-03-08T00:00:00Z'),
    });
    vi.mocked(fetchChainRegistryDir).mockRejectedValue(new Error('Failed to fetch chain registry'));

    await expect(fetchPastAuction(BigInt(6))).rejects.toThrow('Failed to fetch chain registry');
  });
});
