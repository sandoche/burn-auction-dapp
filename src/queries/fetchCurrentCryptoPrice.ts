import { E } from '@/utilities/error-handling';
import { Log } from '@/utilities/logger';

export const fetchCurrentCryptoPrice = async (ids: string[]): Promise<number> => {
  const coingeckoIds = ids.join(',');
  const [error, result] = await E.try(() => fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoIds}&vs_currencies=usd`, { next: { revalidate: 60 } }));

  if (error) {
    Log().error('Error fetching crypto price:', error);
    throw error;
  }

  const price = await result.json();

  return price;
};
