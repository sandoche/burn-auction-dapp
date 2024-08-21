import { Card } from "@/components/ui/Card";

export const BiddingForm = () => {
  return (
    <Card>
      <div className="flex justify-between">
        <h3 className="font-semibold">Place a bid</h3>
        <a href="#" className="text-evmos-primary hover:text-evmos-primary-light">
          Max
        </a>
      </div>
    </Card>
  );
};
