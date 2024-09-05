import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { rpcFetchBiddingHistory } from '@/queries/rpcFetchBiddingHistory';
import { viemPublicClient } from '@/utilities/viem';

const FIRST_AUCTION_BLOCK = process.env.FIRST_AUCTION_BLOCK ? BigInt(process.env.FIRST_AUCTION_BLOCK) : BigInt(0);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

    res.status(200).json({ message: 'Bid events indexed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to index bid events' });
  }
}
