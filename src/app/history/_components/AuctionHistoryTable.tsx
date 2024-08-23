import type { AuctionnedAsset } from '@/types/AuctionnedAsset';
import Image from 'next/image';
import { formatUnits } from '@/utilities/formatUnits';
import { AuctionHistory } from '@/types/AuctionHistory';
import { EVMOS_DECIMALS } from '@/constants';
import { shortenAddress } from '@/utilities/shortenAddress';

export const AuctionHistoryTable = ({ auctionHistory }: { auctionHistory: AuctionHistory }) => {
  return (
    <table className="min-w-full divide-y divide-evmos-darkish">
      <thead>
        <tr>
          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
            #
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
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
      <tbody className="divide-y divide-evmos-dark">
        {auctionHistory.history.map((auction) => (
          <tr key={Number(auction.round)}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">{Number(auction.round)}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm">
              {formatUnits(auction.amountInEvmos, EVMOS_DECIMALS, 2)}
              <Image src="/icons/evmos.svg" alt="Evmos Icon" width={20} height={20} />
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm">
              <a href={`https://www.mintscan.io/evmos/address/${auction.winnerAddress}`} className="text-evmos-primary hover:text-evmos-primary-light" target="_blank">
                {shortenAddress(auction.winnerAddress)}
                <Image src="/icons/external.svg" alt="Evmos Icon" width={16} height={16} />
              </a>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm">
              <a href="#" className="text-evmos-primary hover:text-evmos-primary-light">
                <Image src="/icons/eye.svg" alt="Evmos Icon" width={20} height={20} />
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
