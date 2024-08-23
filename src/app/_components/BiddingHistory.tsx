import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export const BiddingHistory = () => {
  // TODO: update types
  const bids: any = [];

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
            {bids.map((bid: any) => (
              <tr key={bid.transactionId}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">x</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">x</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">x</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">x</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DisclosurePanel>
    </Disclosure>
  );
};
