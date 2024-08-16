"use client";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type TabLink = { name: string; href: string };

export default function Tabs({ tabs }: Readonly<{ tabs: TabLink[] }>) {
  const pathname = usePathname();

  return (
    <TabGroup selectedIndex={tabs.findIndex((tab) => tab.href === pathname)}>
      <TabList className="flex bg-evmos-dark rounded-full p-2">
        {tabs.map((tab) => (
          <Tab
            key={tab.name}
            as={Link}
            href={tab.href}
            className={clsx(
              "py-3 px-4 text-center flex-1 rounded-full",
              tab.href === pathname && "bg-evmos-darkish",
            )}
          >
            {tab.name}
          </Tab>
        ))}
      </TabList>
    </TabGroup>
  );
}
