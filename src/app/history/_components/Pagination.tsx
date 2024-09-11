// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import Image from 'next/image';
import { clsx } from 'clsx';

import { ButtonLink } from '@/components/ui/ButtonLink';

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, itemsPerPage, totalItems }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-center mt-16">
      {currentPage < totalPages && (
        <ButtonLink href={`/history/${Number(currentPage) + 1}`} className="bg-transparent" aria-label="Go to next page">
          <Image src="/icons/arrow-left.svg" alt="Go to next page" width={20} height={20} />
        </ButtonLink>
      )}

      {Array.from({ length: totalPages }, (_, index) => (
        <ButtonLink key={totalPages - index} href={`/history/${totalPages - index}`} className={clsx(currentPage != totalPages - index && '!bg-transparent')}>
          {totalPages - index}
        </ButtonLink>
      ))}

      {currentPage > 1 && (
        <ButtonLink href={`/history/${Number(currentPage) - 1}`} className="bg-transparent" aria-label="Go to previous page">
          <Image src="/icons/arrow-right.svg" alt="Go to previous page" width={20} height={20} />
        </ButtonLink>
      )}
    </div>
  );
};

export default Pagination;
