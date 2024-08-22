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
