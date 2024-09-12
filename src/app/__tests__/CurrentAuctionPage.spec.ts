import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import CurrentAuction from '../page';
import { mockCoinGeckoResponse, mockAuctionResponse, epochInfoResponse } from '../../queries/__tests__/mockedData';

vi.mock('../../queries/fetchCurrentCryptoPrice', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    fetchCurrentCryptoPrice: vi.fn(() => mockCoinGeckoResponse),
  };
});

vi.mock('../../queries/rpcFetchCurrentAuctionInfo', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    rpcFetchCurrentAuctionInfo: vi.fn(() => mockAuctionResponse),
  };
});

vi.mock('../../queries/rpcFetchEpochInfo', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    rpcFetchEpochInfo: vi.fn(() => epochInfoResponse),
  };
});

describe('CurrentAuction Page', () => {
  it('renders without crashing', async () => {
    render(<CurrentAuction />);
    expect(screen.getByText(/Auction #/)).toBeInTheDocument();
  });

  it('displays the error icon when coingecko is failing', async () => {
    const failingMockCoinGeckoResponse = {
      cosmos: {
        usd: null,
      },
      'wrapped-bitcoin': {
        usd: null,
      },
      evmos: { usd: null },
    };

    vi.mocked(fetchCurrentCryptoPrice).mockImplementation(() => failingMockCoinGeckoResponse);

    render(<CurrentAuction />);
    expect(screen.getByAltText('Info')).toBeInTheDocument();
  });
});
