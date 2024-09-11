// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

'use client';
import { useState, useEffect } from 'react';

import { ProgressBar } from '@/components/ui/ProgressBar';

const REFRESH_INTERVAL = 1000;
const PROGRESS_BAR_MAX = 100;

export const BiddingProgress = ({ startDate, endDate }: { startDate: Date; endDate: Date }) => {
  const [isClient, setIsClient] = useState(false);
  const epochDuration = +endDate - +startDate;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const difference = +endDate - +new Date();
      const progress = PROGRESS_BAR_MAX - (difference / epochDuration) * PROGRESS_BAR_MAX;
      setProgress(progress);
    }, REFRESH_INTERVAL);
    return () => {
      clearInterval(interval);
    };
  }, [endDate, epochDuration]);

  return <div>{isClient && <ProgressBar progress={progress} />}</div>;
};
