// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

'use client';
import { viemPublicClient, viemWalletClient } from '@/utilities/viem';
import { E } from '@/utilities/error-handling';
import { Log } from '@/utilities/logger';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/contract';
import { HexAddress } from '@/types/HexAddress';

export const bid = async (sender: HexAddress, amount: bigint) => {
  const [error, result] = await E.try(async () => {
    const { request } = await viemPublicClient.simulateContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'bid',
      args: [sender, amount],
      account: sender,
    });

    return viemWalletClient.writeContract({ ...request, account: sender });
  });

  if (error) {
    Log().error(error);
    throw error;
  }

  return result;
};
