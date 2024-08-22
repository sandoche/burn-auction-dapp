import { Chip } from '@/components/ui/Chip';
import { StatusIndicatorIcon } from '@/components/icons/StatusIndicatorIcon';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { AssetsTable } from './_components/AssetsTable';
import { BiddingHistory } from './_components/BiddingHistory';
import { BiddingForm } from './_components/BiddingForm';
import type { AuctionDetailed } from '@/types/AuctionDetailed';
import { fetchCurrentAuction } from '@/queries/fetchCurrentAuction';
import { Countdown } from './_components/Countdown';
import { formatUnits } from '@/utilities/formatUnits';

const CurrentAuction = async () => {
  const EVMOS_DECIMALS = 18;

  const { round, auction, highestBid }: AuctionDetailed = await fetchCurrentAuction();

  const endDate = new Date(round.endDate);
  const formattedEndDate = endDate.toLocaleString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  });

  return (
    <main>
      <section className="mb-12">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl">Auction #{Number(round.round)}</h1>
          {round.isLast && (
            <Chip>
              <StatusIndicatorIcon />
              In progress
            </Chip>
          )}
        </div>
        <ProgressBar progress={100} />
        <div className="text-2xl mb-1.5 flex">
          <span className="text-evmos-lightish mr-2">Closing in</span> <Countdown date={endDate} />
        </div>
        <p>
          <span className="text-evmos-lightish">Ending</span> {formattedEndDate}
        </p>
      </section>
      <section className="mb-12">
        <h2 className="text-evmos-lightish mb-1">Current total auctioned value</h2>
        <p className="text-3xl mb-6 font-semibold">
          {auction.totalValue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </p>
        <AssetsTable assets={auction.assets} />
      </section>
      <section>
        <div className="flex items-center mb-1">
          <h2 className="text-evmos-lightish mr-2">Current highest bid</h2>
          <Chip moreVisible>🔥 12x cheaper than market value</Chip>
        </div>
        <div className="flex items-end mb-1">
          <span className="text-3xl font-semibold mr-4">{formatUnits(highestBid.bidInEvmos, EVMOS_DECIMALS, 2)} EVMOS</span>
          <span className="text-xl text-evmos-lightish">
            {highestBid.bidInUsd.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </span>
        </div>
        <p className="mb-6">
          {highestBid.bidderAddress !== '0x0000000000000000000000000000000000000000' && (
            <a href="#" className="text-evmos-primary hover:text-evmos-primary-light">
              {highestBid.bidderAddress}
            </a>
          )}
        </p>
        <div className="mb-6">
          <BiddingForm />
        </div>
        <BiddingHistory />
      </section>
    </main>
  );
};

export default CurrentAuction;
