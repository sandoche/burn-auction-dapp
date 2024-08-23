import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest';
import { rpcFetchBiddingHistory } from '../rpcFetchBiddingHistory';

const mockBiddingHistoryResponse = [
  {
    eventName: 'Bid',
    args: {
      sender: '0xC6Fe5D33615a1C52c08018c47E8Bc53646A0E101',
      round: BigInt(1),
      amount: BigInt(19999999999999800),
    },
    address: '0x0000000000000000000000000000000000000900',
    topics: [
      '0x9d3e93cc6e24a82a9829ccb3610b1d6667aa36e996135dabe3eb2153bf9e6908',
      '0x000000000000000000000000c6fe5d33615a1c52c08018c47e8bc53646a0e101',
      '0x0000000000000000000000000000000000000000000000000000000000000001',
    ],
    data: '0x00000000000000000000000000000000000000000000000000470de4df81ff38',
    blockNumber: BigInt(1212),
    transactionHash: '0x72498be6d89a6c6696ffcb13a62b32fcafe82b1c1c7c7e2b37cdc2c574edcf56',
    transactionIndex: 0,
    blockHash: '0xcb81ebf068700238ee6aa2f8e9631928adff4ca98625e37cffe5c4be2e411f6f',
    logIndex: 0,
    removed: false,
  },
  {
    eventName: 'Bid',
    args: {
      sender: '0xC6Fe5D33615a1C52c08018c47E8Bc53646A0E101',
      round: BigInt(1),
      amount: BigInt(199999999999998000),
    },
    address: '0x0000000000000000000000000000000000000900',
    topics: [
      '0x9d3e93cc6e24a82a9829ccb3610b1d6667aa36e996135dabe3eb2153bf9e6908',
      '0x000000000000000000000000c6fe5d33615a1c52c08018c47e8bc53646a0e101',
      '0x0000000000000000000000000000000000000000000000000000000000000001',
    ],
    data: '0x00000000000000000000000000000000000000000000000002c68af0bb13f830',
    blockNumber: BigInt(1231),
    transactionHash: '0xc90cd222f15b803faa699ce3fd7e31daa5eb2e99d1c25856c841c217a3214989',
    transactionIndex: 0,
    blockHash: '0x94d5eec8eedf65f1a44a84b6b9560867cdf10385340c49916160cbaae4645b0e',
    logIndex: 0,
    removed: false,
  },
  {
    eventName: 'Bid',
    args: {
      sender: '0xC6Fe5D33615a1C52c08018c47E8Bc53646A0E101',
      round: BigInt(1),
      amount: BigInt(1999999999999980000),
    },
    address: '0x0000000000000000000000000000000000000900',
    topics: [
      '0x9d3e93cc6e24a82a9829ccb3610b1d6667aa36e996135dabe3eb2153bf9e6908',
      '0x000000000000000000000000c6fe5d33615a1c52c08018c47e8bc53646a0e101',
      '0x0000000000000000000000000000000000000000000000000000000000000001',
    ],
    data: '0x0000000000000000000000000000000000000000000000001bc16d674ec7b1e0',
    blockNumber: BigInt(1240),
    transactionHash: '0xd30314756bf70c9a55eac179b2317f89f27d0fc466e555ebc762bfaef84924fb',
    transactionIndex: 0,
    blockHash: '0xe1a8d1f55a0cf092e8cbbe617b83094e292fb8b6c1a03fd1c3321605080c1095',
    logIndex: 0,
    removed: false,
  },
];

beforeEach(() => {
  vi.mock('../rpcFetchBiddingHistory', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      // @ts-ignore
      ...actual,
      rpcFetchBiddingHistory: vi.fn(() => mockBiddingHistoryResponse),
    };
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('rpcFetchBiddingHistory(round)', async () => {
  it('should return the Bids for a given round number', async () => {
    const result = await rpcFetchBiddingHistory(BigInt(1));
    console.log(result);
    expect(result).toBeDefined();
  });
});
