import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { rpcFetchAuctionEnd } from '@/queries/rpcFetchAuctionEnd';
import { viemPublicClient } from '@/utilities/viem';

const FIRST_AUCTION_BLOCK = process.env.FIRST_AUCTION_BLOCK ? BigInt(process.env.FIRST_AUCTION_BLOCK) : BigInt(0);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
            coins: event.args.coins,
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

    res.status(200).json({ message: 'Auction end events indexed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to index auction end events' });
  }
}
