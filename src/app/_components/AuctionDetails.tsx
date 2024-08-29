// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { Chip } from '@/components/ui/Chip';
import { StatusIndicatorIcon } from '@/components/icons/StatusIndicatorIcon';
import { AssetsTable } from './AssetsTable';
import { BiddingHistory } from './BiddingHistory';
import { BiddingForm } from './BiddingForm';
import type { AuctionDetailed } from '@/types/AuctionDetailed';
import { Countdown } from './Countdown';
import { formatUnits } from '@/utilities/formatUnits';
import { BiddingProgress } from './BiddingProgress';
import { DiscountChip } from './DiscountChip';
import { EVMOS_DECIMALS } from '@/constants';
import { ButtonLink } from '@/components/ui/ButtonLink';
import Image from 'next/image';

export const AuctionDetails = async ({ auctionDetails }: { auctionDetails: AuctionDetailed }) => {
  const { round, auction, highestBid }: AuctionDetailed = auctionDetails;

  const startDate = new Date(round.startDate);
  const formattedStartDate = startDate.toLocaleString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  });

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
          <div className="flex items-center">
            {!round.isLast && (
              <div className="mr-3">
                <ButtonLink href="/history">
                  <Image src="/icons/arrow-left.svg" alt="Back" width={20} height={20} />
                </ButtonLink>
              </div>
            )}
            <h1 className="text-3xl flex">Auction #{Number(round.round)}</h1>
          </div>
          {round.isLast && (
            <Chip>
              <StatusIndicatorIcon />
              In progress
            </Chip>
          )}
        </div>
        <BiddingProgress startDate={round.startDate} endDate={round.endDate} />
        {round.isLast ? (
          <div className="text-2xl mb-1.5 flex">
            <span className="text-evmos-lightish mr-2">Closing in</span> <Countdown date={endDate} />
          </div>
        ) : (
          <p className="mb-1.5">
            <span className="text-evmos-lightish mr-2">Started on</span> {formattedStartDate}
          </p>
        )}
        <p>
          <span className="text-evmos-lightish">{round.isLast ? 'Ending at' : 'Ended'}</span> {formattedEndDate}
        </p>
      </section>
      <section className="mb-12">
        <h2 className="text-evmos-lightish mb-1">{round.isLast ? 'Current total auctioned value' : 'Total auctioned value'}</h2>
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
          <h2 className="text-evmos-lightish mr-2">{round.isLast ? 'Current highest bid' : 'Final bid'}</h2>
          {round.isLast && <DiscountChip currentValueUsd={auction.totalValue} highestBidUsd={highestBid.bidInUsd} />}
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
            <a href={`https://www.mintscan.io/evmos/address/${highestBid.bidderAddress}`} className="text-evmos-primary hover:text-evmos-primary-light" target="_blank">
              {highestBid.bidderAddress}
            </a>
          )}
        </p>
        <div className="mb-6">{round.isLast && <BiddingForm />}</div>
        <BiddingHistory round={round.round} />
      </section>
    </main>
  );
};
