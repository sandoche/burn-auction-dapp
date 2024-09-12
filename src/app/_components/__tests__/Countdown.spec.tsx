// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { render, act, screen } from '@testing-library/react';
import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest';

import { Countdown, DELAY_BEFORE_RELOAD_AFTER_COUNTDOWN_GOES_TO_ZERO } from '../Countdown';
import * as reloadDataModule from '../../_actions/reloadData';

const ONE_SECOND = 1000;
const ONE_HOUR_ONE_MINUTE_AND_TEN_SECONDS = 3670000;

// Mock the entire module
vi.mock('../../_actions/reloadData');

describe('Countdown Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Create a mock function for reloadData
    vi.spyOn(reloadDataModule, 'default').mockImplementation(vi.fn());
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    const targetDate: Date = new Date(Date.now() + ONE_HOUR_ONE_MINUTE_AND_TEN_SECONDS);
    render(<Countdown date={targetDate} />);
    expect(screen.getByText(/0d/)).toBeDefined();
    expect(screen.getByText(/1h/)).toBeDefined();
    expect(screen.getByText(/1m/)).toBeDefined();
    expect(screen.getByText(/10s/)).toBeDefined();
  });

  it('reloads when reaching 0', () => {
    const targetDate = new Date(Date.now() + ONE_SECOND); // Set to 1 second in the future
    render(<Countdown date={targetDate} />);

    // Fast-forward time to just after the countdown should reach zero
    act(() => {
      vi.advanceTimersByTime(ONE_SECOND + 1);
    });

    // Fast-forward time to trigger the delayed reload
    act(() => {
      vi.advanceTimersByTime(DELAY_BEFORE_RELOAD_AFTER_COUNTDOWN_GOES_TO_ZERO);
    });

    // Check if reloadData was called
    expect(reloadDataModule.default).toHaveBeenCalledTimes(1);
  });
});
