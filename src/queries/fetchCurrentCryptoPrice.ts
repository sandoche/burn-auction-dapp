// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { E } from '@/utilities/error-handling';
import { Log } from '@/utilities/logger';

type CryptoPrice = {
  [key: string]: {
    usd: number;
    error?: boolean;
  };
};

const MOCK_COINGECKO_API = process.env.MOCK_COINGECKO_API === 'true';
const STATUS_OK = 200;

export const fetchCurrentCryptoPrice = async (ids: string[]): Promise<CryptoPrice> => {
  // To avoid hitting the rate limit of the Coingecko API
  if (MOCK_COINGECKO_API) {
    return {
      cosmos: {
        usd: 5.9,
      },
      'wrapped-bitcoin': {
        usd: 70000,
      },
      evmos: { usd: 0.0227916 },
    };
  }

  const coingeckoIds = ids.join(',');
  const [error, result] = await E.try(() => fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoIds}&vs_currencies=usd`, { next: { revalidate: 60 } }));
  Log().info('Fetching crypto price:', coingeckoIds);

  if (error || result.status !== STATUS_OK) {
    Log().error('Error fetching crypto price:', error);
    return Object.fromEntries(ids.map((id) => [id, { usd: 0, error: true }]));
  }

  const price = await result.json();

  return price;
};
