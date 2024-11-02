"use client";
import { client,  } from "@/lib";
import { ConnectButton } from "thirdweb/react";
import Link from "next/link";

const Home: React.FC = () => {



  return (
    <div className="h-fit bg-gradient-to-r from-gray-900 via-pink-700 to-purple-900 bg-cover bg-fixed leading-normal tracking-normal text-indigo-400">
      <div className="h-full pb-50">
        <div className="container mx-auto w-full">
          <div className="flex w-full items-center justify-between pt-4">
            <Link
              className="flex items-center text-2xl font-bold text-indigo-400 no-underline hover:no-underline lg:text-4xl"
              href="#"
            >
              Provenance
              <span className="bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Marketplace
              </span>
            </Link>

            <div className="flex content-center justify-between w-80">
              <Link
                href="/marketplace"
                className="mb-8 mt-1 transform rounded bg-gradient-to-r from-purple-800 to-green-500 px-4 py-2 font-bold text-white transition ease-in-out hover:scale-105 hover:from-pink-500 hover:to-green-500 focus:ring"
              >
                Market Place
              </Link>
              <ConnectButton client={client} />
            </div>
          </div>
        </div>

        <div className="container mx-auto items-center pt-24 md:pt-36">
          <div className="w-full flex-col justify-center overflow-y-hidden lg:items-start">
            <h1 className="my-4 text-center text-3xl font-bold leading-tight text-white opacity-75 md:text-left md:text-5xl">
              Ever dream of&nbsp;
              <span className="bg-gradient-to-r from-gray-900 via-pink-500 to-purple-900 bg-clip-text text-transparent">
                transforming <br />
                your property into a&nbsp;
              </span>
              Digital Asset?
            </h1>
            <p className="mb-8 text-center text-base leading-normal md:text-left md:text-2xl">
              Let’s turn that dream into reality!
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

//0x8c1403f83620bc37d931749198ad78000de1957aeb8a8b2c4c85d21536921919
//123
//100112
//133
