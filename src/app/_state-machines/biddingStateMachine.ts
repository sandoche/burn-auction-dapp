// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

'use client';
import { bid } from '@/wallet-actions/bid';
import { parseUnits } from 'viem';
import { EVMOS_DECIMALS } from '@/constants';
import { HexAddress } from '@/types/HexAddress';
import { assign, createMachine, fromPromise } from 'xstate';

export const biddingMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QCMCWEKoHZQHToBswBiAZQFEAVAfQCEBJAEWoEEBZAeQFUA5SgbQAMAXUSgADgHtYqAC6pJWMSAAeiAEwBOdbgAs6gOyDNu3QA4AjIYBsugDQgAnhs3Xcg3Retn1Fi7usAVkF1awBfMIc0DGw8QhIKGgB1FgAZVKohUSQQKRl5RWU1BABmP1xbQLNdQIsSs2qLMwdnBHVBQT0vawN1SzNbQUCIqPRMHHwIIjIuWjZ6ARFlPLkFJRzi811cIzMSwINrdRKDQJsWjV7cM4MDV0EDC0DNEs0RkGjxvFgAV2QAWzk8hwxAgijA+CwADdJABrCGfWK4X4AoGxBDYGEAYwAhgUsFksstpKtChtEFsdoI9gcjicbtYLghLLhuj0mk8+kF1O9ERMUYDZMCoMQwAAnMWSMW4cQEPEAMyl-1wfO+f0Fwox0MkuPxhKWORW+KKiE0mgsO3NBnqvm8JWsJSZxzMrI8Fju7XUXruZl5YyRvyxWLgsGIRMNJON5LaIVwJXj8c0gWsQW0JiZr06nhTL2CgmsVr9MQm4slYuIACUqBWAJrhiSRtYmhBWXy4SzqKpaJ69TTNJwUwQW04dPqmax1ErHCKREBYSQQODKVXE-JN6MAWkZA4QG8CuDNh6PR4GRa+kyIq9J61AxSnLs0Q6G3g6rheGdcFRTBf8Fnz1g6cJZ1VZF1TRHAryjW9EB8AwdleWw-CaDxOyde04wTeMzAefxuTPAMfiDENIPXaCEH0DM7i-Hohj2YxdA8fCSwlKUSLJMjJxKPQzFcO5Xl7D9tjZAxs12fYgIiIA */
  id: 'bidding',
  initial: 'idle',
  context: {
    bidAmount: 0,
    wallet: null as HexAddress | null,
    error: null as string | null,
  },
  states: {
    idle: {
      on: {
        SET_BID_AMOUNT: {
          actions: assign({
            bidAmount: ({ event }) => event.value,
          }),
        },
        SET_WALLET: {
          actions: assign({
            wallet: ({ event }) => event.wallet,
          }),
        },
        SUBMIT: 'submitting',
      },
    },
    submitting: {
      invoke: {
        src: fromPromise(({ input }) => bid(input.wallet, parseUnits(input.bidAmount.toString(), EVMOS_DECIMALS))),
        input: ({ context: { wallet, bidAmount } }) => ({ wallet, bidAmount }),
        onDone: 'success',
        onError: {
          target: 'error',
          actions: assign({
            error: (_, event: unknown) => {
              console.log(event);
              return null;
            },
          }),
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
