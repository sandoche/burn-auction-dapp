// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

'use client';
import { useEffect } from 'react';
import { useMachine } from '@xstate/react';
import Image from 'next/image';

import { Card } from '@/components/ui/Card';
import { dappstore } from '@/dappstore-client';
import { biddingStateMachine } from '@/app/_state-machines/biddingStateMachine';
import { viemPublicClient } from '@/utilities/viem';
import { formatUnits } from '@/utilities/formatUnits';
import { EVMOS_DECIMALS } from '@/constants';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const BiddingForm = ({ evmosToUsdRate }: { evmosToUsdRate: number }) => {
  const [state, send] = useMachine(biddingStateMachine);

  useEffect(() => {
    dappstore.onAccountsChange((accounts) => send({ type: 'SET_WALLET', wallet: accounts[0] }));

    const fetchBalance = async () => {
      if (state.context.wallet) {
        const balance = await viemPublicClient.getBalance({ address: state.context.wallet });
        send({ type: 'SET_BALANCE', balance });
      }
    };
    fetchBalance();
  }, [send, state.context.wallet]);

  const handleBid = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    send({ type: 'SUBMIT' });
  };

  const isSubmitDisabled = (state.context.bidAmount !== '' && !state.can({ type: 'SUBMIT' })) || state.matches('submitting');
  const errorMessage =
    Number(state.context.bidAmount) < 0
      ? 'Bid amount must be greater than 0'
      : Number(state.context.bidAmount) > Number(formatUnits(state.context.balance, EVMOS_DECIMALS, 2))
        ? 'Bid amount exceeds your balance'
        : '';

  return (
    <Card>
      <form onSubmit={handleBid}>
        <div className="flex justify-between">
          <label className="font-semibold" htmlFor="bid">
            Place a bid
          </label>
          <a className="text-evmos-primary hover:text-evmos-primary-light cursor-pointer" onClick={() => send({ type: 'SET_MAX_BID' })}>
            Max
          </a>
        </div>
        <div className="flex pt-2">
          <div className="relative flex-grow mr-2">
            <input
              type="number"
              className="w-full rounded-lg transition-all duration-200 p-2 pr-10 bg-transparent border-2 border-[#3b3634] placeholder:text-[#998e8b] focus:ring-inset focus:ring-[#fe9367]"
              placeholder="Amount"
              value={state.context.bidAmount}
              onChange={(e) => send({ type: 'SET_BID_AMOUNT', value: e.target.value })}
              disabled={state.matches('submitting')}
            />
            <Image src="/icons/evmos.svg" alt="EVMOS" width={24} height={24} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
          <button
            className="disabled:text-evmos-gray-light disabled:bg-evmos-gray disabled:border-evmos-gray items-center justify-center rounded-full transition-[background-color,outline-color,filter] transition-200 flex gap-x-1 outline outline-offset-2 outline-1 outline-transparent bg-evmos-orange-500 hover:bg-evmos-orange-400 py-[9px] px-5 active:outline-evmos-secondary-dark"
            disabled={isSubmitDisabled}
          >
            {state.matches('submitting') ? <LoadingSpinner /> : 'Bid'}
          </button>
        </div>
        <div className="flex justify-between mt-2">
          {Number(state.context.bidAmount) > 0 && <span className="text-evmos-lightish text-sm">≈ ${(Number(state.context.bidAmount) * evmosToUsdRate).toFixed(2)}</span>}
        </div>
      </form>
      {errorMessage && <div className="text-evmos-error text-sm mt-2">{errorMessage}</div>}
      {state.matches('error') && <div className="text-evmos-error text-sm mt-2">{state.context.error}</div>}
      {state.matches('success') && <div className="text-evmos-success text-sm mt-2">Bid placed successfully!</div>}
    </Card>
  );
};
