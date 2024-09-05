// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { CronJob } from 'cron';
import dotenv from 'dotenv';

dotenv.config();

const CRON_TIME = process.env.CRON_TIME || '*/3 * * * * *';
const API_HOST = process.env.API_HOST || 'http://localhost:3000';

const job = new CronJob(CRON_TIME, function () {
  try {
    console.log('[Indexer] Fetching bid events');
    fetch(`${API_HOST}/api/v1/indexer/bid-events`);
    fetch(`${API_HOST}/api/v1/indexer/auction-end-events`);
  } catch (error) {
    console.error('[Indexer] Error fetching bid events', error);
  }
});

job.start();
