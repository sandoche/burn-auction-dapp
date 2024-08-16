import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export const BiddingHistory = () => {
  return (
    <Disclosure>
      <DisclosureButton className="group flex items-center gap-2 text-evmos-lightish">
        Bidding history
        <ChevronDownIcon className="w-5 -rotate-90 group-data-[open]:rotate-0 transition duration-200 ease-out" />
      </DisclosureButton>
      <DisclosurePanel>Coming soon</DisclosurePanel>
    </Disclosure>
  );
};
