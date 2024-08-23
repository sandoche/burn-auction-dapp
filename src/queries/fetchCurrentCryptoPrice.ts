import { E } from '@/utilities/error-handling';
import { Log } from '@/utilities/logger';

type CryptoPrice = {
  [key: string]: {
    usd: number;
  };
};

const MOCK_COINGECKO_API = process.env.MOCK_COINGECKO_API === 'true';

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
    };
  }

  const coingeckoIds = ids.join(',');
  const [error, result] = await E.try(() => fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoIds}&vs_currencies=usd`, { next: { revalidate: 60 } }));

  if (error) {
    Log().error('Error fetching crypto price:', error);
    throw error;
  }

  const price = await result.json();

  return price;
};
