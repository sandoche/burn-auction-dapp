import { render, screen } from '@testing-library/react';
import { DiscountChip } from './DiscountChip';

describe('DiscountChip Component', () => {
  it('displays the correct message when highestBidUsd is 0', () => {
    render(<DiscountChip currentValueUsd={1000} highestBidUsd={0} />);
    expect(screen.getByText('🤯 Be the first to bid')).toBeInTheDocument();
  });

  it('displays the correct discount message when highestBidUsd is less than currentValueUsd', () => {
    render(<DiscountChip currentValueUsd={1000} highestBidUsd={500} />);
    expect(screen.getByText('🔥 2x cheaper than market value')).toBeInTheDocument();
  });

  it('does not render anything when highestBidUsd is greater than currentValueUsd', () => {
    const { container } = render(<DiscountChip currentValueUsd={1000} highestBidUsd={1500} />);
    expect(container).toBeEmptyDOMElement();
  });
});
