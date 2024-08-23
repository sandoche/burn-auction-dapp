import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { fetchBiddingHistory } from '@/queries/fetchBiddingHistory';
import { formatUnits } from '@/utilities/formatUnits';
import { shortenAddress } from '@/utilities/shortenAddress';
import Image from 'next/image';
import { EVMOS_DECIMALS } from '@/constants';

dayjs.extend(relativeTime);

export const BiddingHistoryData = async ({ round }: { round: bigint }) => {
  const bids = await fetchBiddingHistory(round);

  return (
    <>
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
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
              <a href={`https://www.mintscan.io/evmos/address/${bid.bidder}`} className="text-evmos-primary hover:text-evmos-primary-light" target="_blank">
                {shortenAddress(bid.bidder)}
              </a>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm flex">
              <span className="mr-2">{formatUnits(bid.amount, EVMOS_DECIMALS, 2)}</span>
              <Image src="/icons/evmos.svg" alt="Evmos Icon" width={20} height={20} />
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm">{bid.time ? dayjs(bid.time).fromNow() : ''}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm">
              <a href={`https://www.mintscan.io/evmos/tx/${bid.transactionHash}`} className="text-evmos-primary hover:text-evmos-primary-light" target="_blank">
                {shortenAddress(bid.transactionHash)}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};
