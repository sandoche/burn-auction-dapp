import { createPublicClient, http, defineChain } from "viem";

const chainId = parseInt(process.env.CHAIN_ID as string);
const rpcUrl = process.env.RPC_HOST as string;

const evmos = defineChain({
  id: chainId,
  name: "Evmos",
  network: "evmos",
  nativeCurrency: {
    decimals: 18,
    name: "Evmos",
    symbol: "EVMOS",
  },
  rpcUrls: {
    default: { http: [rpcUrl] },
  },
});

export const viemClient = createPublicClient({
  chain: evmos,
  transport: http(rpcUrl),
});
