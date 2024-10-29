import { client } from '@/lib';
import Link from 'next/link'
import { ConnectButton } from "thirdweb/react";

function MarketHeader() {

  return (
    <header className="border-palette-lighter sticky top-0 z-20 border-b bg-black">
      <div className="mx-auto flex max-w-7xl items-center  justify-between px-6 pb-2 pt-4 md:pt-6">
        <Link href="/" className=" cursor-pointer">
          <h1 className="flex no-underline">
            <span className="flex items-center text-2xl font-bold text-indigo-400 no-underline hover:no-underline lg:text-4xl">
              Provenance
              <span className="bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Marketplace
              </span>
            </span>

            <span className="font-primary pt-1 text-xl font-bold tracking-tight">
              {process.env.siteTitle}
            </span>
          </h1>
        </Link>
        <div>
          <Link href="/marketplace/profile" className="pb-5 mr-10">
            Profile
          </Link>
          <ConnectButton client={client} />
        </div>
      </div>
    </header>
  );
}

export default MarketHeader;