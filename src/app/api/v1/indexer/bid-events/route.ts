// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { prisma } from '@/utilities/prisma';
import { rpcFetchBiddingHistory } from '@/queries/rpcFetchBiddingHistory';
import { viemPublicClient } from '@/utilities/viem';
import { Log } from '@/utilities/logger';

const FIRST_AUCTION_BLOCK = process.env.FIRST_AUCTION_BLOCK ? BigInt(process.env.FIRST_AUCTION_BLOCK) : BigInt(0);

export async function GET() {
  try {
    const lastBlockFetched = await prisma.lastBlockFetched.findUnique({
      where: { eventType: 'BID' },
    });

    let fromBlock = lastBlockFetched ? BigInt(lastBlockFetched.lastBlock) + BigInt(1) : FIRST_AUCTION_BLOCK;
    const latestBlock = await viemPublicClient.getBlockNumber();
    let toBlock = BigInt(fromBlock) + BigInt(10000);

    Log().info(`Fetching bid events initial target: ${fromBlock} to block ${toBlock}; latest block: ${latestBlock}`);

    while (BigInt(fromBlock) <= latestBlock) {
      const toBlockOrLatest = BigInt(toBlock) <= latestBlock ? BigInt(toBlock) : 'latest';

      Log().info(`Fetching batch of bid events from block ${fromBlock} to block ${toBlockOrLatest}`);
      const bidEvents = await rpcFetchBiddingHistory(BigInt(fromBlock), toBlockOrLatest);

      for (const event of bidEvents) {
        await prisma.bidEvent.create({
          data: {
            sender: event.args.sender,
            round: event.args.round.toString(),
            amount: event.args.amount.toString(),
            blockNumber: event.blockNumber.toString(),
            transactionHash: event.transactionHash,
            transactionIndex: event.transactionIndex,
            blockHash: event.blockHash,
            logIndex: event.logIndex,
            removed: event.removed,
          },
        });
      }

      await prisma.lastBlockFetched.upsert({
        where: { eventType: 'BID' },
        update: { lastBlock: toBlockOrLatest === 'latest' ? latestBlock.toString() : toBlock.toString() },
        create: { eventType: 'BID', lastBlock: toBlockOrLatest === 'latest' ? latestBlock.toString() : toBlock.toString() },
      });

      fromBlock = toBlock + BigInt(1);
      toBlock = fromBlock + BigInt(10000);
    }

    return Response.json({ message: 'Bid events indexed successfully' }, { status: 200 });
  } catch (error) {
    Log().error(error);
    return Response.json({ error: 'Failed to index bid events' }, { status: 500 });
  }
}
