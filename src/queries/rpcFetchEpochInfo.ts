import { EpochResponse } from '@/types/EpochInfo';
import { E } from '@/utilities/error-handling';
import { Log } from '@/utilities/logger';

const COSMOS_RPC_HOST = process.env.COSMOS_RPC_HOST;

export const rpcFetchEpochInfo = async (): Promise<EpochResponse> => {
  const [error, result] = await E.try(() => fetch(COSMOS_RPC_HOST + '/evmos/epochs/v1/epochs', { next: { revalidate: 60 } }));

  if (error) {
    Log().error('Error querying contract:', error);
    throw error;
  }

  const epochInfo: EpochResponse = await result.json();

  return epochInfo;
};
