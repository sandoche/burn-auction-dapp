// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { custom, createWalletClient } from 'viem';
import { provider } from '@/dappstore-client';
import { evmos } from './viem';

export const viemWalletClient = createWalletClient({
  chain: evmos,
  transport: custom(provider),
});
