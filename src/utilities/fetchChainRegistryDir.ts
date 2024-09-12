// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

'use server';
import { isString } from '@/utilities/assertions';

const GH_API_PROXY = process.env.GH_API_PROXY;

async function getContent(owner: string, repo: string, path: string, ref: string) {
  return fetch(GH_API_PROXY + 'repos/' + owner + '/' + repo + '/contents/' + path + '?ref=' + ref);
}

export const fetchChainRegistryDir = async <T>(dir: string) => {
  const owner = 'evmos';
  const repo = 'chain-token-registry';
  const path = dir;
  const ref = process.env.CHAIN_REGISTRY_REF ?? 'main';

  const dataValues = await getContent(owner, repo, path, ref);
  const data = (await dataValues.json()) as {
    type: 'dir' | 'file' | 'submodule' | 'symlink';
    path: string;
    name: string;
  }[];

  if (!Array.isArray(data)) {
    throw new Error('Expected array');
  }

  const result = await Promise.all(
    data.flatMap(async (file) => {
      if (file.type !== 'file' || !file.name.endsWith('.json')) {
        return [];
      }

      try {
        const content = await getContent(owner, repo, file.path, ref);
        const parsed = (await content.json()) as { content: string };
        const data = atob(parsed.content);
        if (!isString(data)) throw new Error('Expected string');
        return JSON.parse(data) as T;
      } catch (e) {
        return [];
      }
    }),
  );

  return result as T[];
};
