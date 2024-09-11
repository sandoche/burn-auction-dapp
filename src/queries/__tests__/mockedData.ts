// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import type { AuctionInfo } from '@/types/AuctionInfo';

/* eslint-disable no-magic-numbers */

export const mockBiddingHistoryResponse = [
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

export const mockCoinGeckoResponse = {
  cosmos: {
    usd: 5.9,
  },
  'wrapped-bitcoin': {
    usd: 70000,
  },
  evmos: { usd: 0.0227916 },
};

export const mockAuctionResponse: AuctionInfo = {
  tokens: [
    { denom: 'uatom', amount: BigInt(10000000) },
    { denom: 'wbtc-satoshi', amount: BigInt(10000000) },
  ],
  highestBid: { denom: 'aevmos', amount: BigInt(0) },
  currentRound: BigInt(100),
  bidderAddress: '0x0000000000000000000000000000000000000000',
};

export const epochInfoResponse = {
  epochs: [
    {
      identifier: 'day',
      start_time: '2024-08-23T09:36:10.275537574Z',
      duration: '86400s',
      current_epoch: '1',
      current_epoch_start_time: '2024-08-23T09:36:10.275537574Z',
      epoch_counting_started: true,
      current_epoch_start_height: '1',
    },
    {
      identifier: 'week',
      start_time: '2024-08-23T09:36:10.275537574Z',
      duration: '60s',
      current_epoch: '3',
      current_epoch_start_time: '2024-08-23T11:36:10.275537574Z',
      epoch_counting_started: true,
      current_epoch_start_height: '2373',
    },
  ],
  pagination: { next_key: null, total: '2' },
};

export const mockAuctionEndEvents = [
  {
    eventName: 'AuctionEnd',
    args: {
      winner: '0xC6Fe5D33615a1C52c08018c47E8Bc53646A0E101',
      round: BigInt(1),
      coins: [{ denom: 'uatom', amount: BigInt(10000000) }],
      burned: BigInt(1999999999999980000),
    },
    address: '0x0000000000000000000000000000000000000900',
    topics: [
      '0x5b3a9936864cfd40fcf14918121b73b631d6b435ff40db3ace08465db2109f94',
      '0x000000000000000000000000c6fe5d33615a1c52c08018c47e8bc53646a0e101',
      '0x0000000000000000000000000000000000000000000000000000000000000001',
    ],
    data: '0x00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000001bc16d674ec7b1e0000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000098968000000000000000000000000000000000000000000000000000000000000000057561746f6d000000000000000000000000000000000000000000000000000000',
    blockNumber: BigInt(2373),
    transactionHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    transactionIndex: 0,
    blockHash: '0x228a7251f29b1017a2902cdf85ca384b0e6d575ac9c7aa53d2c667952a85be12',
    logIndex: 0,
    removed: false,
  },
  {
    eventName: 'AuctionEnd',
    args: {
      winner: '0xC6Fe5D33615a1C52c08018c47E8Bc53646A0E101',
      round: BigInt(3),
      coins: [{ denom: 'uatom', amount: BigInt(1000000) }],
      burned: BigInt(10000000000000000000),
    },
    address: '0x0000000000000000000000000000000000000900',
    topics: [
      '0x5b3a9936864cfd40fcf14918121b73b631d6b435ff40db3ace08465db2109f94',
      '0x000000000000000000000000c6fe5d33615a1c52c08018c47e8bc53646a0e101',
      '0x0000000000000000000000000000000000000000000000000000000000000003',
    ],
    data: '0x00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000008ac7230489e8000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000f424000000000000000000000000000000000000000000000000000000000000000057561746f6d000000000000000000000000000000000000000000000000000000',
    blockNumber: BigInt(3942),
    transactionHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    transactionIndex: 0,
    blockHash: '0x5b963985e8f4cb264c9d5dc9562149f7130c52c9114192b5e3c35d7a7f7a57e8',
    logIndex: 0,
    removed: false,
  },
];

export const mockAuctionEndEventsRound3 = [
  {
    eventName: 'AuctionEnd',
    args: {
      winner: '0xC6Fe5D33615a1C52c08018c47E8Bc53646A0E101',
      round: BigInt(3),
      coins: [{ denom: 'uatom', amount: BigInt(1000000) }],
      burned: BigInt(10000000000000000000),
    },
    address: '0x0000000000000000000000000000000000000900',
    topics: [
      '0x5b3a9936864cfd40fcf14918121b73b631d6b435ff40db3ace08465db2109f94',
      '0x000000000000000000000000c6fe5d33615a1c52c08018c47e8bc53646a0e101',
      '0x0000000000000000000000000000000000000000000000000000000000000003',
    ],
    data: '0x00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000008ac7230489e8000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000f424000000000000000000000000000000000000000000000000000000000000000057561746f6d000000000000000000000000000000000000000000000000000000',
    blockNumber: BigInt(3942),
    transactionHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    transactionIndex: 0,
    blockHash: '0x5b963985e8f4cb264c9d5dc9562149f7130c52c9114192b5e3c35d7a7f7a57e8',
    logIndex: 0,
    removed: false,
  },
];
