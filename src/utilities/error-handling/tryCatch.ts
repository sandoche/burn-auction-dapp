// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { Log } from '../logger';
import { ensureError } from './normalizeError';

// eslint-disable-next-line no-unused-vars
export function tryCatch<T extends Promise<unknown>>(fn: () => T): Promise<[null, Awaited<T>] | [Error, null]>;
// eslint-disable-next-line no-unused-vars
export function tryCatch<T>(fn: () => T): [null, T] | [Error, null];
export function tryCatch<T>(fn: () => T) {
  try {
    const result = fn();
    if (result instanceof Promise) {
      return result.then((value) => [null, value] as const).catch((error) => [ensureError(error), null] as const);
    }
    return [null, fn()] as const;
  } catch (error) {
    Log().error(error);
    return [ensureError(error), null] as const;
  }
}
