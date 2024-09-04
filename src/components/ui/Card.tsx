// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

export const Card = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="bg-evmos-dark p-6 rounded-3xl">{children}</div>;
};
