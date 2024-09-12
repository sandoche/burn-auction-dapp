// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Suspense } from 'react';

import { SkeletonBlob } from '@/components/ui/Skeleton';

import { BiddingHistoryData } from './BiddingHistoryData';

dayjs.extend(relativeTime);

export const BiddingHistory = async ({ round }: { round: bigint }) => {
  return (
    <Disclosure>
      <DisclosureButton className="group flex items-center gap-2 text-evmos-lightish">
        Bidding history
        <ChevronDownIcon className="w-5 -rotate-90 group-data-[open]:rotate-0 transition duration-200 ease-out" />
      </DisclosureButton>
      <DisclosurePanel>
        <table className="min-w-full divide-y divide-evmos-darkish-less">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                Bidder
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                Amount
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                Time
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                Transaction
              </th>
            </tr>
          </thead>
          <Suspense
            fallback={
              <tbody>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                    <SkeletonBlob className="w-full h-2" />
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                    <SkeletonBlob className="w-full h-2" />
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                    <SkeletonBlob className="w-full h-2" />
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                    <SkeletonBlob className="w-full h-2" />
                  </th>
                </tr>
              </tbody>
            }
          >
            <BiddingHistoryData round={round} />
          </Suspense>
        </table>
      </DisclosurePanel>
    </Disclosure>
  );
};
