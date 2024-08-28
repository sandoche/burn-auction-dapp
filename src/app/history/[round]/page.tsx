// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { Chip } from '@/components/ui/Chip';
import { StatusIndicatorIcon } from '@/components/icons/StatusIndicatorIcon';
import { AssetsTable } from './_components/AssetsTable';
import { BiddingHistory } from './_components/BiddingHistory';
import { BiddingForm } from './_components/BiddingForm';
import type { AuctionDetailed } from '@/types/AuctionDetailed';
import { fetchCurrentAuction } from '@/queries/fetchCurrentAuction';
import { Countdown } from './_components/Countdown';
import { formatUnits } from '@/utilities/formatUnits';
import { RefreshHome } from './_components/RefreshHome';
import { BiddingProgress } from './_components/BiddingProgress';
import { DiscountChip } from '/_components/DiscountChip';
import { EVMOS_DECIMALS } from '@/constants';

const AuctionPage = async ({ params }: { params: { round: number } }) => {
  // const { round, auction, highestBid }: AuctionDetailed = await fetchCurrentAuction();

  // const endDate = new Date(round.endDate);
  // const formattedEndDate = endDate.toLocaleString('en-US', {
  //   weekday: 'short',
  //   day: 'numeric',
  //   month: 'long',
  //   year: 'numeric',
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   timeZoneName: 'short',
  // });

  return <main>{params.round}</main>;
};

export default AuctionPage;
