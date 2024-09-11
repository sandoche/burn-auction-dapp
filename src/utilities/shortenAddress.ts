// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

export const shortenAddress = (address: string): string => {
  // eslint-disable-next-line
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
