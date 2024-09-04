// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

export const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="pt-2">
      <div className="overflow-hidden h-2 mb-4 flex rounded bg-evmos-darkish-less">
        <div style={{ width: `${progress}%` }} className="bg-evmos-secondary rounded"></div>
      </div>
    </div>
  );
};
