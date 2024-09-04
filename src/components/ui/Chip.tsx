// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import clsx from 'clsx';

type ChipProps = {
  moreVisible?: boolean;
  children: React.ReactNode;
};

export const Chip = ({ moreVisible = false, children }: ChipProps) => {
  return (
    <div
      className={clsx(
        'flex tracking-wide items-center w-fit h-[28px] pl-[10px] pr-2 py-2 rounded-2xl text-sm gap-x-2 [&_.icon]:h-3 [&_.icon]:w-3 transition-all duration-300 ease-in-out hover:bg-opacity-[0.2] hover:dark:bg-opacity-[0.2] focus:bg-opacity-[0.2] focus:dark:bg-opacity-[0.2] bg-success-light dark:bg-success-dark text-success dark:text-success-dark',
        moreVisible ? 'bg-opacity-[0.2] dark:bg-opacity-[0.2] font-semibold' : 'bg-opacity-[0.08] dark:bg-opacity-[0.08]',
      )}
    >
      {children}
    </div>
  );
};
