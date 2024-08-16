import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Tabs from "@/components/ui/Tabs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Evmos Burn Auction",
  description: "The Evmos Burn Auction Instant dApp",
};

const navigationTabs = [
  { name: "Current auction", href: "/" },
  { name: "Past auctions", href: "/history" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container mx-auto max-w-xl p-4">
          <nav>
            <Tabs tabs={navigationTabs} />
          </nav>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
