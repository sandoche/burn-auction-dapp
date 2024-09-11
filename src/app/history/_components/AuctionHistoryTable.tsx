// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import Image from 'next/image';
import Link from 'next/link';

import { formatUnits } from '@/utilities/formatUnits';
import { AuctionHistory } from '@/types/AuctionHistory';
import { EVMOS_DECIMALS } from '@/constants';
import { shortenAddress } from '@/utilities/shortenAddress';

export const AuctionHistoryTable = ({ auctionHistory }: { auctionHistory: AuctionHistory }) => {
  return (
    <table className="min-w-full divide-y divide-evmos-darkish-less">
      <thead>
        <tr>
          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
            #
          </th>
          <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-white text-right">
            Amount
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
            Winner
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white"></th>
        </tr>
      </thead>
      {auctionHistory.history.length === 0 && (
        <tbody>
          <tr>
            <td colSpan={4} className="text-center py-4 text-evmos-lightish">
              There is no auction history yet.
            </td>
          </tr>
        </tbody>
      )}
      <tbody className="divide-y divide-evmos-darkish-less">
        {auctionHistory.history.map((auction) => (
          <tr key={Number(auction.round)}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-evmos-lightish sm:pl-0">{Number(auction.round)}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm flex justify-end text-evmos-lightish">
              <span className="mr-2">{formatUnits(auction.amountInEvmos, EVMOS_DECIMALS, 2)}</span>
              <Image src="/icons/evmos.svg" alt="Evmos Icon" width={20} height={20} />
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm">
              <a href={`https://www.mintscan.io/evmos/address/${auction.winnerAddress}`} className="text-evmos-primary hover:text-evmos-primary-light flex" target="_blank">
                <span className="mr-2">{shortenAddress(auction.winnerAddress)}</span>
                <Image src="/icons/external.svg" alt="Evmos Icon" width={16} height={16} />
              </a>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm">
              <Link href={`/auction/${auction.round}`} className="text-evmos-primary hover:text-evmos-primary-light">
                <Image src="/icons/eye.svg" alt="Evmos Icon" width={20} height={20} />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
