// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import type { AuctionDetailed } from '@/types/AuctionDetailed';
import { fetchCurrentAuction } from '@/queries/fetchCurrentAuction';

import { AuctionDetails } from './_components/AuctionDetails';
import { RefreshHome } from './_components/RefreshHome';

const CurrentAuction = async () => {
  const auctionDetails: AuctionDetailed = await fetchCurrentAuction();

  return (
    <>
      <RefreshHome />
      <AuctionDetails auctionDetails={auctionDetails} />
    </>
  );
};

export default CurrentAuction;
