import Image from 'next/image';
import { fetchAuctionHistory } from '@/queries/fetchAuctionHistory';
import { AuctionHistoryTable } from './_components/AuctionHistoryTable';
import { formatUnits } from '@/utilities/formatUnits';
import { EVMOS_DECIMALS } from '@/constants';
import { useState } from 'react';
import Pagination from '@/app/_components/Pagination';

const History = async () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const auctionHistory = await fetchAuctionHistory(currentPage, itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="mb-10">
      <h1 className="text-3xl mb-6">History</h1>
      <section className="mb-12">
        <h2 className="text-evmos-lightish mb-1">Total amount burned 🔥</h2>
        <p className="text-3xl mb-6 font-semibold flex">
          <span className="mr-2">{formatUnits(auctionHistory.totalBurned, EVMOS_DECIMALS, 2)}</span> <Image src="/icons/evmos.svg" alt="Evmos Icon" width={32} height={32} />
        </p>
        <AuctionHistoryTable auctionHistory={auctionHistory} />
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={auctionHistory.totalItems}
          onPageChange={handlePageChange}
        />
      </section>
    </section>
  );
};

export default History;
