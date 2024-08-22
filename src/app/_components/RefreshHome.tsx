'use client';
import { useEffect } from 'react';
import reloadData from '../_actions/reloadData';

const NEXT_PUBLIC_REFRESH_INTERVAL_MS = parseInt(process.env.NEXT_PUBLIC_REFRESH_INTERVAL_MS as string) ?? 60000;

export const RefreshHome = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      reloadData();
    }, NEXT_PUBLIC_REFRESH_INTERVAL_MS);
    return () => {
      clearInterval(interval);
    };
  });

  return null;
};
