import { E } from '@/utilities/error-handling';
import { Log } from '@/utilities/logger';
import { rpcFetchEpochInfo } from './rpcFetchEpochInfo';

export const fetchCurrentEndDate = async (): Promise<Date> => {
  const [error, epochInfo] = await E.try(() => rpcFetchEpochInfo());

  if (error) {
    Log().error('Error fetching current date:', error);
    throw error;
  }

  const currentEpoch = epochInfo.epochs.find((epoch) => epoch.identifier === 'week');

  if (!currentEpoch) {
    Log().error('No current epoch found');
    throw new Error('No current epoch found');
  }

  const currentEpochStart = new Date(currentEpoch.current_epoch_start_time);
  const currentEpochDuration = parseInt(currentEpoch.duration, 10);
  const currentEpochEnd = new Date(currentEpochStart.getTime() + currentEpochDuration * 1000);

  Log().info('Current end date:', currentEpochEnd);

  return currentEpochEnd;
};
