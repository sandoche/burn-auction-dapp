// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { E } from '@/utilities/error-handling';
import { Log } from '@/utilities/logger';

const MOCK_COINGECKO_API = process.env.MOCK_COINGECKO_API === 'true';
// eslint-disable-next-line no-magic-numbers
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;
const STATUS_OK = 200;

export const fetchPastCryptoPrice = async (coinId: string, date: Date): Promise<number> => {
  // To avoid hitting the rate limit of the Coingecko API
  if (MOCK_COINGECKO_API) {
    // eslint-disable-next-line no-magic-numbers
    return 5.9;
  }

  const formattedDate = date.toISOString().split('T')[0].split('-').reverse().join('-');

  const [error, result] = await E.try(() => fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/history?date=${formattedDate}`, { next: { revalidate: ONE_YEAR_IN_SECONDS } }));
  Log().info('Fetching crypto price:', { coinId, date });

  if (error || result.status !== STATUS_OK) {
    Log().error('Error fetching crypto price:', error);
    throw error;
  }

  const priceData = await result.json();
  const price = priceData.market_data.current_price.usd;

  Log().info('Fetched crypto price:', price);

  return price;
};
