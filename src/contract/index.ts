// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import type { HexAddress } from '@/types/HexAddress';

export const CONTRACT_ADDRESS: HexAddress = '0x0000000000000000000000000000000000000900';

export const CONTRACT_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'winner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint64',
        name: 'round',
        type: 'uint64',
      },
      {
        components: [
          {
            internalType: 'string',
            name: 'denom',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        indexed: false,
        internalType: 'struct Coin[]',
        name: 'coins',
        type: 'tuple[]',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'burned',
        type: 'uint256',
      },
    ],
    name: 'AuctionEnd',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint64',
        name: 'round',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Bid',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint64',
        name: 'round',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'denom',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'CoinDeposit',
    type: 'event',
  },
  {
    inputs: [],
    name: 'auctionInfo',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'string',
                name: 'denom',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            internalType: 'struct Coin[]',
            name: 'tokens',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'denom',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            internalType: 'struct Coin',
            name: 'highestBid',
            type: 'tuple',
          },
          {
            internalType: 'uint64',
            name: 'currentRound',
            type: 'uint64',
          },
          {
            internalType: 'address',
            name: 'bidderAddress',
            type: 'address',
          },
        ],
        internalType: 'struct AuctionInfo',
        name: 'info',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'bid',
    outputs: [
      {
        internalType: 'bool',
        name: 'success',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'denom',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'depositCoin',
    outputs: [
      {
        internalType: 'bool',
        name: 'success',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
