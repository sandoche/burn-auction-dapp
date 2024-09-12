// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';

import { DiscountChip } from '../DiscountChip';

describe('DiscountChip Component', () => {
  it('displays the correct message when highestBidUsd is 0', () => {
    render(<DiscountChip currentValueUsd={1000} highestBidUsd={0} />);
    expect(screen.getByText('🤯 Be the first to bid')).toBeDefined();
  });

  it('displays the correct discount message when highestBidUsd is less than currentValueUsd', () => {
    render(<DiscountChip currentValueUsd={1000} highestBidUsd={500} />);
    expect(screen.getByText('🔥 2x cheaper than market value')).toBeDefined();
  });

  it('does not render anything when highestBidUsd is greater than currentValueUsd', () => {
    const { container } = render(<DiscountChip currentValueUsd={1000} highestBidUsd={1500} />);
    expect(container.firstChild).toBeNull();
  });
});
