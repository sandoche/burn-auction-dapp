// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { Tabs } from '@/components/ui/Tabs';
import { FireIcon } from '@/components/icons/FireIcon';
import { HistoryIcon } from '@/components/icons/HistoryIcon';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Evmos Burn Auction',
  description: 'The Evmos Burn Auction Instant dApp',
};

const navigationTabs = [
  { name: 'Current auction', href: '/', icon: <FireIcon /> },
  { name: 'Past auctions', href: '/history', icon: <HistoryIcon /> },
];

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container mx-auto max-w-xl p-4">
          <nav>
            <Tabs tabs={navigationTabs} />
          </nav>
          <main>{children}</main>
        </div>
        <p className="text-center text-sm text-evmos-lightish mt-8 opacity-50">
          Data provided by{' '}
          <a target="_blank" rel="noreferrer" className="font-bold" href="https://www.coingecko.com">
            CoinGecko
          </a>
        </p>
      </body>
    </html>
  );
};

export default RootLayout;

export const dynamic = 'force-dynamic';
