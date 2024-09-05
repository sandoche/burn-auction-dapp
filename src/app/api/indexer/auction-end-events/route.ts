// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { prisma } from '@/utilities/prisma';
import { rpcFetchAuctionEnd } from '@/queries/rpcFetchAuctionEnd';
import { viemPublicClient } from '@/utilities/viem';
import { Log } from '@/utilities/logger';

const FIRST_AUCTION_BLOCK = process.env.FIRST_AUCTION_BLOCK ? BigInt(process.env.FIRST_AUCTION_BLOCK) : BigInt(0);

export async function GET() {
  try {
    const latestEvent = await prisma.auctionEndEvent.findFirst({
      orderBy: {
        blockNumber: 'desc',
      },
    });

    let fromBlock = latestEvent ? latestEvent.blockNumber + BigInt(1) : FIRST_AUCTION_BLOCK;
    const latestBlock = await viemPublicClient.getBlockNumber();
    let toBlock = fromBlock + BigInt(10000);

    while (fromBlock <= latestBlock) {
      if (toBlock > latestBlock) {
        toBlock = latestBlock;
      }

      const auctionEndEvents = await rpcFetchAuctionEnd(fromBlock, toBlock);

      for (const event of auctionEndEvents) {
        await prisma.auctionEndEvent.create({
          data: {
            winner: event.args.winner,
            round: event.args.round,
            // coins: null,
            burned: event.args.burned,
            blockNumber: event.blockNumber,
            transactionHash: event.transactionHash,
            transactionIndex: event.transactionIndex,
            blockHash: event.blockHash,
            logIndex: event.logIndex,
            removed: event.removed,
          },
        });
      }

      fromBlock = toBlock + BigInt(1);
      toBlock = fromBlock + BigInt(10000);
    }

    return Response.json({ message: 'Auction end events indexed successfully' }, { status: 200 });
  } catch (error) {
    Log().error(error);
    return Response.json({ error: 'Failed to index auction end events' }, { status: 500 });
  }
}
