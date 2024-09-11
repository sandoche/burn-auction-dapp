// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

export const ButtonAction = ({
  children,
  action,
}: Readonly<{
  children: React.ReactNode;
  action: () => void;
}>) => {
  return (
    <button
      onClick={() => action()}
      className="disabled:text-evmos-gray-light disabled:bg-evmos-gray disabled:border-evmos-gray items-center justify-center rounded-full transition-[background-color,outline-color,filter] transition-200 flex gap-x-1 outline outline-offset-2 outline-1 outline-transparent bg-evmos-orange-500 hover:bg-evmos-orange-400 py-[9px] px-5 active:outline-evmos-secondary-dark"
    >
      {children}
    </button>
  );
};
