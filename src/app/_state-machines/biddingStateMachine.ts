// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

'use client';
import { bid } from '@/wallet-actions/bid';
import { parseUnits } from 'viem';
import { EVMOS_DECIMALS } from '@/constants';
import { HexAddress } from '@/types/HexAddress';
import { assign, setup, fromPromise } from 'xstate';
import { formatUnits } from '@/utilities/formatUnits';

export const biddingStateMachine = setup({
  types: {
    context: {} as {
      bidAmount: number | string;
      wallet: HexAddress | null;
      error: string | null;
      balance: bigint;
    },
  },
  actions: {
    setBidAmount: assign({
      bidAmount: ({ event }) => event.value,
    }),
    setWallet: assign({
      wallet: ({ event }) => event.wallet,
    }),
    setBalance: assign({
      balance: ({ event }) => event.balance,
    }),
    setError: assign({
      error: ({ event }) => {
        console.log(event);
        return null;
      },
    }),
    setMaxBid: assign({
      bidAmount: ({ context }) => Math.max(Number(formatUnits(context.balance, EVMOS_DECIMALS, 2)) - 0.1, 0),
    }),
  },
  actors: {
    bid: fromPromise(({ input }: { input: { wallet: HexAddress; bidAmount: number } }) => bid(input.wallet as HexAddress, parseUnits(input.bidAmount.toString(), EVMOS_DECIMALS))),
  },
  guards: {
    isBidValid: ({ context }) => {
      return Number(context.bidAmount) > 0 && Number(context.bidAmount) <= Number(formatUnits(context.balance, EVMOS_DECIMALS, 2));
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QCMCWEKoHZQHToBswBiAZQFEAVAfQCEBJAEWoEEBZAeQFUA5SgbQAMAXUSgADgHtYqAC6pJWMSAAeiAEwBOdbgAs6gOyDNu3QA4AjIYBsugDQgAnhs3Xcg3Retn1Fi7usAVkF1awBfMIc0DGw8QhIKGgB1FgAZVKohUSQQKRl5RWU1BABmP1xbQLNdQIsSs2qLMwdnBHVBQT0vawN1SzNbQUCIqPRMHHwIIjIuWjZ6ARFlPLkFJRzi811cIzMSwINrdRKDQJsWjV7cM4MDV0EDC0DNEs0RkGjxvFgAV2QAWzk8hwxAgijA+CwADdJABrCGfWK4X4AoGxBDYGEAYwAhgUsFksstpKtChtEFsdoI9gcjicbtYLghLLhuj0mk8+kF1O9ERMUYDZMCoMQwAAnMWSMW4cQEPEAMyl-1wfO+f0Fwox0MkuPxhKWORW+KKiE0mgsO3NBnqvm8JWsJSZxzMrI8Fju7XUXruZl5YyRvyxWLgsGIRMNJON5LaIVwJXj8c0gWsQW0JiZr06nhTL2CgmsVr9MQm4slYuIACUqBWAJrhiSRtYmhBWXy4SzqKpaJ69TTNJwUwQW04dPqmax1ErHCKREBYSQQODKVXE-JN6MAWkZA4QG8CuDNh6PR4GRa+kyIq9J61AxSnLs0Q6G3g6rheGdcFRTBf8Fnz1g6cJZ1VZF1TRHAryjW9EB8AwdleWw-CaDxOyde04wTeMzAefxuTPAMfiDENIPXaCEH0DM7i-Hohj2YxdA8fCSwlKUSLJMjJxKPQzFcO5Xl7D9tjZAxs12fYgIiIA */
  id: 'bidding',
  initial: 'idle',
  context: {
    bidAmount: '',
    wallet: null as HexAddress | null,
    error: null as string | null,
    balance: BigInt(0),
  },
  states: {
    idle: {
      on: {
        SET_BID_AMOUNT: {
          actions: 'setBidAmount',
        },
        SET_WALLET: {
          actions: 'setWallet',
        },
        SET_BALANCE: {
          actions: 'setBalance',
        },
        SET_MAX_BID: {
          actions: 'setMaxBid',
        },
        SUBMIT: {
          target: 'submitting',
          guard: 'isBidValid',
        },
      },
    },
    submitting: {
      invoke: {
        src: 'bid',
        input: ({ context: { wallet, bidAmount } }: { context: { bidAmount: string | number; wallet: HexAddress | null } }) => ({
          wallet: wallet as HexAddress,
          bidAmount: Number(bidAmount),
        }),
        onDone: 'success',
        onError: {
          target: 'error',
          actions: 'setError',
        },
      },
    },
    success: {
      type: 'final',
      always: 'idle',
    },
    error: {
      on: {
        RETRY: 'idle',
      },
    },
  },
});
