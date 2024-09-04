// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { Chip } from '@/components/ui/Chip';

export const DiscountChip = ({ currentValueUsd, highestBidUsd }: { currentValueUsd: number; highestBidUsd: number }) => {
  if (highestBidUsd > currentValueUsd) {
    return <></>;
  }

  const text = highestBidUsd === 0 ? `🤯 Be the first to bid` : `🔥 ${Math.round(currentValueUsd / highestBidUsd)}x cheaper than market value`;

  return <Chip moreVisible>{text}</Chip>;
};
