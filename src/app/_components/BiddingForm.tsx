// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

'use client';
import { Card } from '@/components/ui/Card';
import { bid } from '@/wallet-actions/bid';
import { dappstore } from '@/dappstore-client';
import { useEffect } from 'react';
import { parseUnits } from 'viem';
import { EVMOS_DECIMALS } from '@/constants';
import { HexAddress } from '@/types/HexAddress';
import { assign, createMachine, fromPromise } from 'xstate';
import { useMachine } from '@xstate/react';

const biddingMachine = createMachine({
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
        // src: async (context) => {
        //   if (!context.wallet) {
        //     throw new Error('Wallet not connected');
        //   }
        //   return bid(context.wallet, parseUnits(context.bidAmount.toString(), EVMOS_DECIMALS));
        // },
        src: fromPromise(({ input }) => bid(input.wallet, parseUnits(input.bidAmount.toString(), EVMOS_DECIMALS))),
        input: ({ context: { wallet, bidAmount } }) => ({ wallet, bidAmount }),
        onDone: 'success',
        onError: {
          target: 'error',
          actions: assign({
            error: (_, event: unknown) => {
              console.log(event);
              return null;
            }, // (event as { data: { message: string } }).data.message,
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

export const BiddingForm = () => {
  const [state, send] = useMachine(biddingMachine);

  useEffect(() => {
    dappstore.onAccountsChange((accounts) => send({ type: 'SET_WALLET', wallet: accounts[0] }));
  }, [send]);

  const handleBid = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    send({ type: 'SUBMIT' });
  };

  return (
    <Card>
      <form onSubmit={handleBid}>
        <div className="flex justify-between">
          <label className="font-semibold" htmlFor="bid">
            Place a bid
          </label>
          <a href="#" className="text-evmos-primary hover:text-evmos-primary-light">
            Max
          </a>
        </div>
        <div className="flex pt-2">
          <input
            type="number"
            className="mr-2 w-full rounded-lg transition-all duration-200 p-2 bg-transparent border-2 border-[#3b3634] placeholder:text-[#998e8b] focus:ring-inset focus:ring-[#fe9367]"
            placeholder="Amount"
            onChange={(e) => send({ type: 'SET_BID_AMOUNT', value: e.target.value })}
            disabled={state.matches('submitting')}
          />
          <button
            className="items-center justify-center rounded-full transition-[background-color,outline-color,filter] transition-200 flex gap-x-1 outline outline-offset-2 outline-1 outline-transparent bg-evmos-orange-500 hover:bg-evmos-orange-400 py-[9px] px-5 active:outline-evmos-secondary-dark"
            disabled={state.matches('submitting')}
          >
            {state.matches('submitting') ? 'Bidding...' : 'Bid'}
          </button>
        </div>
      </form>
      {state.matches('error') && (
        <div className="text-red-500 mt-2">
          Error: {state.context.error}
          <button onClick={() => send({ type: 'RETRY' })} className="ml-2 text-evmos-primary">
            Retry
          </button>
        </div>
      )}
      {state.matches('success') && <div className="text-green-500 mt-2">Bid placed successfully!</div>}
    </Card>
  );
};
