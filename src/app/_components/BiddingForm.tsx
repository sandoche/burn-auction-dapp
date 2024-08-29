// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

'use client';
import { Card } from '@/components/ui/Card';
import { dappstore } from '@/dappstore-client';
import { useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { biddingMachine } from '@/app/_state-machines/biddingStateMachine';

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
