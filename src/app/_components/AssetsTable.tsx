// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import type { AuctionnedAsset } from '@/types/AuctionnedAsset';
import Image from 'next/image';
import { formatUnits } from '@/utilities/formatUnits';
import { Tooltip } from '@/components/ui/Tooltip';

export const AssetsTable = ({ assets }: { assets: AuctionnedAsset[] }) => {
  return (
    <table className="min-w-full divide-y divide-evmos-darkish-less">
      <thead>
        <tr>
          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
            Asset
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
            Total value
          </th>
        </tr>
      </thead>
      {assets.length === 0 && (
        <tbody>
          <tr>
            <td colSpan={2} className="text-center py-4 text-evmos-lightish">
              There are no assets in this auction, come back for the next one!
            </td>
          </tr>
        </tbody>
      )}
      <tbody className="divide-y divide-evmos-darkish-less">
        {assets.map((asset) => (
          <tr key={asset.ticker}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
              <div className="flex items-center">
                <div className="h-11 w-11 flex-shrink-0">
                  <Image alt={asset.ticker} src={asset.iconUrl} width="100" height="100" className="h-11 w-11 rounded-full" />
                </div>
                <div className="ml-4">
                  <div className="font-medium text-evmos-lightish">{asset.ticker}</div>
                  <div className="mt-1 text-evmos-lightish opacity-70 text-sm">{asset.name}</div>
                </div>
              </div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm">
              <p className="text-evmos-lightish">{formatUnits(asset.amount, asset.exponent, 2)}</p>
              <div className="text-evmos-lightish text-sm flex items-center">
                <span className="opacity-70">
                  {asset.valueInUsd.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </span>
                {asset.priceError && (
                  <Tooltip content="We could not fetch the price of this asset">
                    <Image src="/icons/info.svg" alt="warning" width="16" height="16" className="ml-1" />
                  </Tooltip>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
