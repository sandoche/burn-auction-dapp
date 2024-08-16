import Chip from "@/components/ui/Chip";
import StatusIndicatorIcon from "@/components/icons/StatusIndicatorIcon";
import ProgressBar from "@/components/ui/ProgressBar";

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
      },
      {
        ticker: "ETH",
        name: "Ethereum",
        amount: 10,
        valueInUsd: 3000,
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
    <main className="">
      <section>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl">Auction #{auction.round}</h1>
          <Chip>
            <StatusIndicatorIcon />
            In progress
          </Chip>
        </div>
        <ProgressBar progress={auction.progress} />
        <p>
          Closing in <span>4d 23h 33m 2s</span>
        </p>
        <p>
          Ending <span>Mon 11th of August 2024 - 23:59 CET</span>
        </p>
      </section>
      <section>
        <h2>Current total auctioned value</h2>
        <p>$1,200,100.00</p>
        <div>TABLE WILL BE HERE</div>
      </section>
      <section>
        <div>
          <h2>Current highest bid</h2>
          <Chip>🔥 12x cheaper than market value</Chip>
        </div>
        <div>
          <span>{auction.currentHighestBidinEvmos} EVMOS</span>
          <span>${auction.currentHighestBidInUsd}</span>
          <a href="#">{auction.currentHighestBidder}</a>
        </div>
        <div>Place a bid widget will be here</div>
        <div>Bidding History</div>
      </section>
    </main>
  );
}
