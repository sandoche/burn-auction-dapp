// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

'use client';
import { useState, useEffect } from 'react';

import { Log } from '@/utilities/logger';

import reloadData from '../_actions/reloadData';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const REFRESH_INTERVAL = 1000;
const DELAY_BEFORE_RELOAD_AFTER_COUNTDOWN_GOES_TO_ZERO = 5000;

const calculateTimeLeft = (date: Date): TimeLeft => {
  const difference = +date - +new Date();
  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      /* eslint-disable no-magic-numbers */
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      /* eslint-enable no-magic-numbers */
    };
  }

  return timeLeft;
};

export const Countdown = ({ date }: { date: Date }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(date));

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(date);
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        clearInterval(interval);
        setTimeout(() => {
          Log().info('Reloading data after countdown to 0');
          reloadData();
        }, DELAY_BEFORE_RELOAD_AFTER_COUNTDOWN_GOES_TO_ZERO);
      }
    }, REFRESH_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [date]);

  return (
    <div>
      {isClient && (
        <>
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </>
      )}
    </div>
  );
};
