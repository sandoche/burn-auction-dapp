// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import Link from 'next/link';
import { clsx } from 'clsx';

export const ButtonLink = ({
  children,
  href,
  className,
}: Readonly<{
  children: React.ReactNode;
  href: string;
  className?: string;
}>) => {
  return (
    <Link
      href={href}
      className={clsx(
        'items-center justify-center rounded-full transition-[background-color,outline-color,filter] transition-200 flex gap-x-1 outline outline-offset-2 outline-1 outline-transparent bg-evmos-orange-500 hover:bg-evmos-orange-400 w-10 h-10 active:outline-evmos-secondary-dark',
        className,
      )}
    >
      {children}
    </Link>
  );
};
