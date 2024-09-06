// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import { SkeletonBlob, SkeletonLine } from '@/components/ui/Skeleton';

const Loading = async () => {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main>
      <section className="mb-12">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <SkeletonBlob className="w-64 mb-4" />
          </div>
        </div>
        <SkeletonLine className="w-full h-2 mb-4" />

        <p className="text-2xl mb-1.5 flex">
          <SkeletonLine className="w-56 h-6" />
        </p>

        <p>
          <SkeletonLine className="w-72 h-6" />
        </p>
      </section>
      <section className="mb-12">
        <h2 className="text-evmos-lightish mb-1">
          <SkeletonLine className="w-64 h-6" />
        </h2>
        <p className="text-3xl mb-6 font-semibold">
          <SkeletonLine className="w-48 h-8" />
        </p>
        <SkeletonBlob className="w-full h-12" />
      </section>
      <section>
        <div className="flex items-center mb-1">
          <h2 className="text-evmos-lightish mr-2">
            <SkeletonLine className="w-40 h-6" />
          </h2>
        </div>
        <div className="flex items-end mb-1">
          <span className="text-3xl font-semibold mr-4">
            <SkeletonLine className="w-32 h-8" />
          </span>
        </div>
        <p className="mb-6">
          <SkeletonLine className="w-full h-6" />
        </p>
        <div className="mb-6">
          <SkeletonBlob className="w-full h-12" />
        </div>
      </section>
    </main>
  );
};

export default Loading;
