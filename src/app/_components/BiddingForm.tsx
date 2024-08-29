// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { Card } from '@/components/ui/Card';

export const BiddingForm = () => {
  return (
    <Card>
      <form>
        <div className="flex justify-between">
          <label className="font-semibold" htmlFor="bid">
            Place a bid
          </label>
          <a href="#" className="text-evmos-primary hover:text-evmos-primary-light">
            Max
          </a>
        </div>
        <div className="flex">
          <input type="text" />
          <button>Bid</button>
        </div>
      </form>
    </Card>
  );
};
