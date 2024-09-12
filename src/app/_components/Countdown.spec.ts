import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Countdown } from './Countdown';
import reloadData from '../_actions/reloadData';

vi.mock('../_actions/reloadData', () => ({
  default: vi.fn(),
}));

describe('Countdown Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('renders correctly', () => {
    const targetDate = new Date(Date.now() + 10000); // 10 seconds from now
    render(<Countdown date={targetDate} />);
    expect(screen.getByText(/d/)).toBeInTheDocument();
    expect(screen.getByText(/h/)).toBeInTheDocument();
    expect(screen.getByText(/m/)).toBeInTheDocument();
    expect(screen.getByText(/s/)).toBeInTheDocument();
  });

  it('reloads when reaching 0', () => {
    const targetDate = new Date(Date.now() + 1000); // 1 second from now
    render(<Countdown date={targetDate} />);
    vi.advanceTimersByTime(1000);
    expect(reloadData).toHaveBeenCalled();
  });
});
