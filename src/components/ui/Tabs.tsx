"use client";
import { Tab, TabGroup, TabList } from "@headlessui/react";

import Link from "next/link";
import { usePathname } from "next/navigation";

type TabLink = { name: string; href: string };

export default function Tabs({ tabs }: Readonly<{ tabs: TabLink[] }>) {
  const pathname = usePathname();

  return (
    <TabGroup selectedIndex={tabs.findIndex((tab) => tab.href === pathname)}>
      <TabList>
        {tabs.map((tab) => (
          <Tab key={tab.name} as={Link} href={tab.href}>
            {tab.name}
          </Tab>
        ))}
      </TabList>
    </TabGroup>
  );
}
