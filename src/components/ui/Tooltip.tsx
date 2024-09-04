// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import clsx from 'clsx';

export const Tooltip = ({ children, content, extraClasses }: { children: React.ReactNode; content: React.ReactNode; extraClasses?: string }) => {
  return (
    <>
      <div className="has-tooltip">
        <span className={clsx('tooltip rounded shadow-lg p-2 bg-evmos-darkish text-evmos-lightish -mt-10 -translate-x-1/2', extraClasses)}>{content}</span>
        {children}
      </div>
    </>
  );
};
