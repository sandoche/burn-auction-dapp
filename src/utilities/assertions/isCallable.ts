// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

// eslint-disable-next-line no-unused-vars
export function isCallable(fn: unknown): fn is (...args: unknown[]) => unknown {
  return typeof fn === 'function';
}
