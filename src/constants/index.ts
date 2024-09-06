// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

export const EVMOS_DECIMALS = 18;

export const UNKNOWN_TOKEN_METADATA_DEFAULT = {
  coingeckoId: '',
  denom: '',
  name: 'Unknown Token',
  ticker: 'UNKNOWN TOKEN',
  amount: 0,
  valueInUsd: 0,
  iconUrl: '/icons/unknown-token.svg',
  exponent: 0,
  amountWithDecimals: 0,
};

export const PAGINATION_ITEMS_PER_PAGE = process.env.PAGINATION_ITEMS_PER_PAGE ? parseInt(process.env.PAGINATION_ITEMS_PER_PAGE) : 10;
