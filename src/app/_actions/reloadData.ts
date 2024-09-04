// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

'use server';

import { revalidatePath } from 'next/cache';

export default async function reloadData() {
  revalidatePath('/');
}
