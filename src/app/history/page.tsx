import { fetchAuctionHistory } from '@/queries/fetchAuctionHistory';
import { AuctionHistoryTable } from './_components/AuctionHistoryTable';
import { formatUnits } from '@/utilities/formatUnits';
import { EVMOS_DECIMALS } from '@/constants';

const History = async () => {
  const auctionHistory = await fetchAuctionHistory();
  console.log(auctionHistory);

  return (
    <section className="mb-10">
      <h1 className="text-3xl">History</h1>
      <section className="mb-12">
        <h2 className="text-evmos-lightish mb-1">Total amount burned 🔥</h2>
        <p className="text-3xl mb-6 font-semibold">{formatUnits(auctionHistory.totalBurned, EVMOS_DECIMALS, 2)}</p>
        <AuctionHistoryTable auctionHistory={auctionHistory} />
      </section>
    </section>
  );
};

export default History;
