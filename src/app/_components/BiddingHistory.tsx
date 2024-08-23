import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Suspense } from 'react';
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
        <table className="min-w-full divide-y divide-evmos-darkish">
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
          <Suspense fallback={<p>Loading...</p>}>
            <BiddingHistoryData round={round} />
          </Suspense>
        </table>
      </DisclosurePanel>
    </Disclosure>
  );
};
