// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import Image from 'next/image';
import { AuctionHistoryTable } from './AuctionHistoryTable';
import { formatUnits } from '@/utilities/formatUnits';
import { EVMOS_DECIMALS } from '@/constants';
import Pagination from '../_components/Pagination';
import type { AuctionHistory } from '@/types/AuctionHistory';
import { PAGINATION_ITEMS_PER_PAGE } from '@/constants';

export const HistoryContent = ({ auctionHistory, pageNumber }: { auctionHistory: AuctionHistory; pageNumber: number }) => {
  return (
    <section className="mb-10">
      <h1 className="text-3xl mb-6">History</h1>
      <section className="mb-12">
        <h2 className="text-evmos-lightish mb-1">Total amount burned 🔥</h2>
        <p className="text-3xl mb-6 font-semibold flex">
          <span className="mr-2">{formatUnits(auctionHistory.totalBurned, EVMOS_DECIMALS, 2)}</span> <Image src="/icons/evmos.svg" alt="Evmos Icon" width={32} height={32} />
        </p>
        <AuctionHistoryTable auctionHistory={auctionHistory} />
        <Pagination currentPage={pageNumber} itemsPerPage={PAGINATION_ITEMS_PER_PAGE} totalItems={auctionHistory.totalItems} />
      </section>
    </section>
  );
};
