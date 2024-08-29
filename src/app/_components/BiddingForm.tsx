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
        <div className="flex pt-2">
          <input
            type="text"
            className="mr-2 w-full rounded-lg transition-all duration-200 p-2 bg-transparent border-2 border-[#3b3634] placeholder:text-[#998e8b] focus:ring-inset focus:ring-[#fe9367]"
            placeholder="Amount"
          />
          <button className="items-center justify-center rounded-full transition-[background-color,outline-color,filter] transition-200 flex gap-x-1 outline outline-offset-2 outline-1 outline-transparent bg-evmos-orange-500 hover:bg-evmos-orange-400 py-[9px] px-5 active:outline-evmos-secondary-dark">
            Bid
          </button>
        </div>
      </form>
    </Card>
  );
};
