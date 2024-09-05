// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { SkeletonBlob, SkeletonLine } from '@/components/ui/Skeleton';

const Loading = async () => {
  return (
    <section className="mb-10">
      <SkeletonLine className="w-1/4 h-10 mb-6" />
      <section className="mb-12">
        <SkeletonLine className="w-1/3 h-6 mb-1" />
        <div className="flex items-center mb-6">
          <SkeletonLine className="w-1/5 h-10 mr-2" />
        </div>
        <SkeletonBlob className="w-full h-12" />
      </section>
    </section>
  );
};

export default Loading;
