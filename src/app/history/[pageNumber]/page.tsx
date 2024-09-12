// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { fetchAuctionHistory } from '@/queries/fetchAuctionHistory';
import { PAGINATION_ITEMS_PER_PAGE } from '@/constants';

import { HistoryContent } from '../_components/HistoryContent';

const HistoryPaginated = async ({ params }: { params: { pageNumber: number } }) => {
  const auctionHistory = await fetchAuctionHistory(params.pageNumber, PAGINATION_ITEMS_PER_PAGE);

  return <HistoryContent auctionHistory={auctionHistory} pageNumber={params.pageNumber} />;
};

export default HistoryPaginated;
