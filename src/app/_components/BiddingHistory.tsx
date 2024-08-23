import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { fetchBiddingHistory } from '@/queries/fetchBiddingHistory';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { formatUnits } from '@/utilities/formatUnits';
import { shortenAddress } from '@/utilities/shortenAddress';

dayjs.extend(relativeTime);

export const BiddingHistory = async ({ round }: { round: bigint }) => {
  const bids = await fetchBiddingHistory(round);

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
          {bids.length === 0 && (
            <tbody>
              <tr>
                <td colSpan={4} className="text-center py-4 text-evmos-lightish">
                  There is no bidding history yet.
                </td>
              </tr>
            </tbody>
          )}
          <tbody className="divide-y divide-evmos-dark">
            {bids.map((bid) => (
              <tr key={bid.transactionHash}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">{shortenAddress(bid.bidder)}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">{formatUnits(bid.amount, 18, 2)}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">{bid.time ? dayjs(bid.time).fromNow() : ''}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">{shortenAddress(bid.transactionHash)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DisclosurePanel>
    </Disclosure>
  );
};
