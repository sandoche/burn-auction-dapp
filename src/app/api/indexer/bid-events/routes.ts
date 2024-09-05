// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { prisma } from '@/utilities/prisma';
import { rpcFetchBiddingHistory } from '@/queries/rpcFetchBiddingHistory';
import { viemPublicClient } from '@/utilities/viem';

const FIRST_AUCTION_BLOCK = process.env.FIRST_AUCTION_BLOCK ? BigInt(process.env.FIRST_AUCTION_BLOCK) : BigInt(0);

export async function GET() {
  try {
    const latestEvent = await prisma.bidEvent.findFirst({
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

      const bidEvents = await rpcFetchBiddingHistory(fromBlock, toBlock);

      for (const event of bidEvents) {
        await prisma.bidEvent.create({
          data: {
            sender: event.args.sender,
            round: event.args.round,
            amount: event.args.amount,
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

    return Response.json({ message: 'Bid events indexed successfully' }, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Failed to index bid events' }, { status: 500 });
  }
}
