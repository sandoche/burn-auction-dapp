import { expect, describe, it, expectTypeOf } from 'vitest';
import { fetchCurrentEndDate } from '../fetchCurrentEndDate';

describe('fetchCurrentEndDate()', async () => {
  it('should return a date', async () => {
    const result = await fetchCurrentEndDate();
    expect(result).not.toBeNull();
    expectTypeOf(result).toMatchTypeOf<Date>();
  });
});
