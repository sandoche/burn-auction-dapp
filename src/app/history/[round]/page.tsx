// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import type { AuctionDetailed } from '@/types/AuctionDetailed';
import { fetchPastAuction } from '@/queries/fetchPastAuction';
import { AuctionDetails } from '@/app/_components/AuctionDetails';

const AuctionPage = async ({ params }: { params: { round: bigint } }) => {
  const auctionDetails: AuctionDetailed = await fetchPastAuction(params.round);

  return <AuctionDetails auctionDetails={auctionDetails} />;
};

export default AuctionPage;
