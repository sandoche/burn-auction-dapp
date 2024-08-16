import Chip from "@/components/ui/Chip";
import StatusIndicatorIcon from "@/components/icons/StatusIndicatorIcon";
import ProgressBar from "@/components/ui/ProgressBar";
import AssetsTable from "./_components/AssetsTable";
import BiddingHistory from "./_components/BiddingHistory";

export default function CurrentAuction() {
  // dummy data for now
  const auction = {
    round: 3,
    endTime: new Date(Date.now() + 10 * 60 * 1000),
    isOngoing: true,
    auctionnedAssets: [
      {
        ticker: "ATOM",
        name: "Atom",
        amount: 100,
        valueInUsd: 1000,
        iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/3794.png",
      },
      {
        ticker: "ETH",
        name: "Ethereum",
        amount: 10,
        valueInUsd: 3000,
        iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
      },
    ],
    totalAuctionnedValue: 4000,
    currentHighestBidinEvmos: 10000,
    currentHighestBidInUsd: 1000,
    currentHighestBidder: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    progress: 0.25 * 100,
  };

  // dummy data for now
  const biddingHistory = [];

  return (
    <main>
      <section className="mb-12">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl">Auction #{auction.round}</h1>
          <Chip>
            <StatusIndicatorIcon />
            In progress
          </Chip>
        </div>
        <ProgressBar progress={auction.progress} />
        <p className="text-2xl mb-1.5">
          <span className="text-evmos-lightish">Closing in</span> 4d 23h 33m 2s
        </p>
        <p>
          <span className="text-evmos-lightish">Ending</span> Mon 11th of August
          2024 - 23:59 CET
        </p>
      </section>
      <section className="mb-12">
        <h2 className="text-evmos-lightish mb-1">
          Current total auctioned value
        </h2>
        <p className="text-3xl mb-6 font-semibold">$1,200,100.00</p>
        <AssetsTable assets={auction.auctionnedAssets} />
      </section>
      <section>
        <div className="flex items-center mb-1">
          <h2 className="text-evmos-lightish mr-2">Current highest bid</h2>
          <Chip moreVisible>🔥 12x cheaper than market value</Chip>
        </div>
        <div className="flex items-end mb-1">
          <span className="text-3xl font-semibold mr-4">
            {auction.currentHighestBidinEvmos} EVMOS
          </span>
          <span className="text-xl text-evmos-lightish">
            ${auction.currentHighestBidInUsd}
          </span>
        </div>
        <p className="mb-6">
          <a
            href="#"
            className="text-evmos-primary hover:text-evmos-primary-light"
          >
            {auction.currentHighestBidder}
          </a>
        </p>
        <div className="mb-6">Place a bid widget will be here</div>
        <BiddingHistory />
      </section>
    </main>
  );
}
