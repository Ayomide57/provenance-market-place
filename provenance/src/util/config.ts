import { http } from 'viem';
import { createConfig } from 'wagmi';
import { mainnet, sepolia } from '@wagmi/core/chains';

import { defineChain } from 'thirdweb';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';


type ChainOptions = {
  blockExplorers?: Array<{
    apiUrl?: string;
    name: string;
    url: string;
  }>;
  experimental?: { increaseZeroByteCount?: boolean };
  faucets?: Array<string>;
  icon?: Icon;
  id: number;
  name?: string;
  nativeCurrency?: {
    decimals?: number;
    name?: string;
    symbol?: string;
  };
  rpc?: string;
  testnet?: true;
};
type Chain = Readonly<ChainOptions & { rpc: string }>;

export const NeoX1: any = {
  blockExplorers: [{
    apiUrl: "https://neoxt4scan.ngd.network/",
    name: "NeoX Testnet T4",
    url: "https://neoxt4scan.ngd.network/",
  }],
  id: 12227332,
  name: "NeoX Testnet T4",
  nativeCurrency: {
    decimals: 8,
    name: "GAS",
    symbol: "GAS"
  },
  testnet: true,
  rpc: 'https://neoxt4seed1.ngd.network'
};

export const NeoX = defineChain({
  id: 12227332,
  rpc: 'https://neoxt4scan.ngd.network',
  //rpc: `https://12227332.rpc.thirdweb.com/${process.env.NEXT_PUBLIC_ClIENT_ID2}`
});



//0x1bddabb544fffd89ed263b28cf5827635b60e345
/**export const neo = defineChain({
  id: 12227332,
  name: 'NeoX Testnet',
  nativeCurrency: { name: 'GAS', symbol: 'GAS', decimals: 8 },
  rpcUrls: {
    default: { http: ['https://neoxt4seed1.ngd.network'] },
  },
  blockExplorers: {
    default: { name: 'Neoxt4scan', url: 'https://neoxt4scan.ngd.network/' },
  },
})





export const config = createConfig({ 
  chains: [mainnet, sepolia, neo],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [neo.id]: http(),
  },
}) **/
