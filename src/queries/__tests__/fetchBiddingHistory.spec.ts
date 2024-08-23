import { expect, describe, it } from 'vitest';
import { fetchBiddingHistory } from '../fetchBiddingHistory';

describe('fetchBiddingHistory(round)', async () => {
  it('should return the bidding history of a given round', async () => {
    const result = await fetchBiddingHistory(BigInt(1));
    console.log(result);
    expect(result).toBeDefined();
  });
});
