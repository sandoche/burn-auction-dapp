// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { createPublicClient, http, defineChain, custom, createWalletClient } from 'viem';
import { EVMOS_DECIMALS } from '@/constants';
import { provider } from '@/dappstore-client';

const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID as string);
const rpcUrl = process.env.NEXT_PUBLIC_RPC_HOST as string;

const evmos = defineChain({
  id: chainId,
  name: 'Evmos',
  network: 'evmos',
  nativeCurrency: {
    decimals: EVMOS_DECIMALS,
    name: 'Evmos',
    symbol: 'EVMOS',
  },
  rpcUrls: {
    default: { http: [rpcUrl] },
  },
});

export const viemPublicClient = createPublicClient({
  chain: evmos,
  transport: http(rpcUrl, {
    fetchOptions: {
      cache: 'no-store',
    },
  }),
  cacheTime: 0,
});

export const viemWalletClient = createWalletClient({
  chain: evmos,
  transport: custom(provider),
});
