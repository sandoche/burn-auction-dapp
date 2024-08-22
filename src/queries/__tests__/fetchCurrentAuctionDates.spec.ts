import { expect, describe, it, expectTypeOf } from 'vitest';
import { fetchCurrentAuctionDates } from '../fetchCurrentAuctionDates';

describe('fetchCurrentAuctionDates()', async () => {
  it('should return the start and end dates', async () => {
    const result = await fetchCurrentAuctionDates();
    expect(result).not.toBeNull();
    expectTypeOf(result.start).toMatchTypeOf<Date>();
    expectTypeOf(result.end).toMatchTypeOf<Date>();
    expect(result.start).toBeInstanceOf(Date);
    expect(result.end).toBeInstanceOf(Date);
    expect(result.start.getTime()).toBeLessThan(result.end.getTime());
  });
});
