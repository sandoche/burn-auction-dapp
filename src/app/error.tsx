// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

'use client';

import { useEffect } from 'react';
import { Log } from '@/utilities/logger';
import { ButtonAction } from '@/components/ui/ButtonAction';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    Log().error(error);
  }, [error]);

  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center flex flex-col">
          <p className="mb-4 text-3xl tracking-tight font-bold text-white">Sorry, something went wrong</p>
          <p className="mb-4 text-lg text-evmos-lightish">An error occurred while fetching the auction data. Please try again later.</p>
          <div className="flex justify-center">
            <ButtonAction action={reset}>Try again</ButtonAction>
          </div>
        </div>
      </div>
    </section>
  );
}
