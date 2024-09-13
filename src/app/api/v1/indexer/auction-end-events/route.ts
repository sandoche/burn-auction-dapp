// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { prisma } from '@/utilities/prisma';
import { rpcFetchAuctionEnd } from '@/queries/rpcFetchAuctionEnd';
import { viemPublicClient } from '@/utilities/viem';
import { Log } from '@/utilities/logger';
import { EVMOS_DECIMALS } from '@/constants';

const MAX_BLOCKS_PER_REQUEST = 10000;
const FIRST_AUCTION_BLOCK = process.env.FIRST_AUCTION_BLOCK ? BigInt(process.env.FIRST_AUCTION_BLOCK) : BigInt(0);
const BATCH_SIZE = BigInt(MAX_BLOCKS_PER_REQUEST);

export async function GET() {
  try {
    const lastBlockFetched = await prisma.lastBlockFetched.findUnique({
      where: { eventType: 'AUCTION_END' },
    });

    let fromBlock = lastBlockFetched ? BigInt(lastBlockFetched.lastBlock) + BigInt(1) : FIRST_AUCTION_BLOCK;
    const latestBlock = await viemPublicClient.getBlockNumber();
    let toBlock = BigInt(fromBlock) + BATCH_SIZE;
    let count = 0;

    Log().info(`Fetching auction end events initial target: ${fromBlock} to block ${toBlock}; latest block: ${latestBlock}`);

    while (BigInt(fromBlock) <= latestBlock) {
      const toBlockOrLatest = BigInt(toBlock) <= latestBlock ? BigInt(toBlock) : 'latest';

      Log().info(`Fetching auction end events from block ${fromBlock} to block ${toBlockOrLatest}`);
      const auctionEndEvents = await rpcFetchAuctionEnd(BigInt(fromBlock), toBlockOrLatest);

      for (const event of auctionEndEvents) {
        await prisma.auctionEndEvent.upsert({
          where: { round: Number(event.args.round) },
          update: {},
          create: {
            winner: event.args.winner,
            round: Number(event.args.round),
            coins: {
              create:
                event.args.coins?.map((coin) => ({
                  denom: coin.denom,
                  amount: coin.amount.toString(),
                })) || [],
            },
            burned: event.args.burned.toString(),
            blockNumber: event.blockNumber.toString(),
            // eslint-disable-next-line no-magic-numbers
            burnedWithoutDecimals: Number(BigInt(event.args.burned) / BigInt(10 ** EVMOS_DECIMALS)),
            transactionHash: event.transactionHash,
            transactionIndex: event.transactionIndex,
            blockHash: event.blockHash,
            logIndex: event.logIndex,
            removed: event.removed,
          },
        });
        count++;
      }

      await prisma.lastBlockFetched.upsert({
        where: { eventType: 'AUCTION_END' },
        update: { lastBlock: toBlockOrLatest === 'latest' ? latestBlock.toString() : toBlock.toString() },
        create: { eventType: 'AUCTION_END', lastBlock: toBlockOrLatest === 'latest' ? latestBlock.toString() : toBlock.toString() },
      });

      fromBlock = toBlock + BigInt(1);
      toBlock = fromBlock + BATCH_SIZE;
    }

    return Response.json({ message: 'Auction end events indexed successfully', count }, { status: 200 });
  } catch (error) {
    Log().error(error);
    return Response.json({ error: 'Failed to index auction end events' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
