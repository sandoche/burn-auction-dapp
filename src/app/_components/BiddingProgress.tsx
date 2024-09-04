// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

'use client';
import { useState, useEffect } from 'react';
import { ProgressBar } from '@/components/ui/ProgressBar';

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
      const progress = 100 - (difference / epochDuration) * 100;
      setProgress(progress);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [endDate, epochDuration]);

  return <div>{isClient && <ProgressBar progress={progress} />}</div>;
};
