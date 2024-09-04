// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

export const Tooltip = ({ children, content }: { children: React.ReactNode; content: React.ReactNode }) => {
  return (
    <>
      <div className="has-tooltip">
        <span className="tooltip rounded shadow-lg p-2 bg-evmos-darkish text-evmos-lightish -mt-10 -translate-x-1/2">{content}</span>
        {children}
      </div>
    </>
  );
};
