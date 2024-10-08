// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

'use client';
import { Tab, TabGroup, TabList } from '@headlessui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

type TabLink = { name: string; href: string; icon: React.ReactNode };

export const Tabs = ({ tabs }: Readonly<{ tabs: TabLink[] }>) => {
  const pathname = usePathname();

  const isActive = (tabHref: string) => {
    if (tabHref === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(tabHref);
  };

  return (
    <TabGroup selectedIndex={tabs.findIndex((tab) => isActive(tab.href))} className="mb-6">
      <TabList className="flex bg-evmos-dark rounded-full p-2">
        {tabs.map((tab) => (
          <Tab
            key={tab.name}
            as={Link}
            href={tab.href}
            className={clsx('py-3 px-4 flex-1 rounded-full flex items-center justify-center text-evmos-light', isActive(tab.href) && 'bg-evmos-darkish')}
          >
            <div className="mr-1">{tab.icon} </div>
            {tab.name}
          </Tab>
        ))}
      </TabList>
    </TabGroup>
  );
};
