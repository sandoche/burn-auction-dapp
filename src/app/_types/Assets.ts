export type Asset = {
  ticker: string;
  name: string;
  amount: number;
  valueInUsd: number;
  iconUrl: string;
};

export type Assets = Asset[];
