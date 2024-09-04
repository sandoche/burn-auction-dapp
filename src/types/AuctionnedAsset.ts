// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

export type AuctionnedAsset = {
  coingeckoId: string;
  denom: string;
  name: string;
  ticker: string;
  amount: bigint;
  exponent: number;
  amountWithDecimals: number;
  valueInUsd: number;
  iconUrl: string;
};
