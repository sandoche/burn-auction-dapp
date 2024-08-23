import { expect, describe, it } from 'vitest';
import { rpcFetchBiddingHistory } from '../rpcFetchBiddingHistory';

describe('rpcFetchBiddingHistory(round)', async () => {
  it('should return the Bids for a given round number', async () => {
    const result = await rpcFetchBiddingHistory(BigInt(1));
    console.log(result);
    expect(result).toBeDefined();
  });
});
