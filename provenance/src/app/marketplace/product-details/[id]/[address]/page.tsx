"use client";
import ProductForm from "@/components/ProductForm";
import ProductImage from "@/components/ProductImages";
import {  faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { assets, initiateBid, pmContract, pmpContract } from "@/util";
import React from "react";
import { BigNumberish } from "ethers";
import { balanceOf, decimals } from "thirdweb/extensions/erc20";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import Modal from "@/components/Modal";
import BidList from "@/components/BidList";

export type Product = {
  name: string;
  address: string;
  description: string;
  document_url: string;
  images: [];
  attributes: [];
};

function ProductDetail({
  params,
}: {
  params: { id: string; address: `0x${string}` };
}) {
  const [productData, setProperties] = useState<Product>();
  const [linkVideo, updateVideoLink] = useState<any[]>();
  const [showbid, updateBid] = useState<boolean>(false);


  const smartAccount = useActiveAccount();

  const initiateBidContract = useCallback(async () => {
    const product: any = initiateBid({
      account: smartAccount,
      property_RegId: Number(params.id),
    });
  }, [params.id, smartAccount]);

  const { data, isLoading } = useReadContract({
    contract: pmContract,
    method: "assets",
    params: [params.address, BigInt(params.id)],
  });

  const fetchIPFSInfo = React.useCallback(async () => {
    if (data) {
      const ipfs = await fetch(
        data[6].replace("ipfs://", "https://ipfs.io/ipfs/"),
        {
          headers: { Accept: "application/json" },
        },
      );
      const jsonRp = await ipfs.json();
      const newRes: React.SetStateAction<any[] | undefined> = [];
      jsonRp.data.images.map((image: any) => {
          newRes.push(image.replace("ipfs://", "https://ipfs.io/ipfs/"));
      });
      updateVideoLink(newRes);
      setProperties({
        name: jsonRp.data.name,
        address: jsonRp.data.address,
        description: jsonRp.data.description,
        document_url: jsonRp.data.document_url.replace(
          "ipfs://",
          "https://ipfs.io/ipfs/",
        ),
        images: jsonRp.data.images,
        attributes: jsonRp.data.attributes,
      });
    }
  }, [data]);

  useEffect(() => {
    fetchIPFSInfo();
  }, [fetchIPFSInfo]);

  return (
    <div className="min-h-screen py-12 sm:pt-20">
      {data != undefined && productData && (
        <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:items-start md:space-x-4 md:space-y-0 lg:space-x-9">
          <ProductImage images={linkVideo} />
          <div className="min-h-128 mx-auto flex h-full w-full flex-col justify-between space-y-4 md:w-1/2">
            {smartAccount && data[2] == smartAccount.address && (
              <div>
                <button
                  className={
                    "font-primary hover:bg-palette-dark mt-2 flex w-full items-baseline justify-center rounded-sm bg-gradient-to-r from-pink-800 to-red-500 pb-2 pt-3 text-xl font-semibold text-white"
                  }
                  aria-label="cart-button"
                  type="submit"
                  onClick={() => initiateBidContract()}
                >
                  Initiate Bid
                  <FontAwesomeIcon icon={faShoppingCart} className="ml-2 w-5" />
                </button>
              </div>
            )}

            <div className=" font-primary text-white">
              <h1 className="py-2 text-2xl font-extrabold leading-relaxed text-white sm:py-4">
                {productData.name}
              </h1>
              <p className="text-md">{`${productData.description}`}</p>
              <br />
              <p className="">
                <span className="text-lg font-extrabold">Owner: </span>{" "}
                {data[2]}
              </p>
              <p className="">
                <span className="text-lg font-extrabold">
                  Property Contract Address:
                </span>
                {` ${data[3]}`}
              </p>
              <p className="">
                <span className="text-lg font-extrabold">
                  Property Registration Number:
                </span>
                {` ${data[4]}`}
              </p>
              {productData.attributes.map((attribute, index) => {
                return (
                  <p key={index} className="text-lg font-normal">
                    <span className="text-lg font-extrabold">
                      {`${attribute["trait_type"]}`}:
                    </span>
                    {` ${attribute["value"]}`}{" "}
                  </p>
                );
              })}
              <Link href={productData ? productData?.document_url : ""}>
                View Asset Document
              </Link>
              <button onClick={() => updateBid(!showbid)}>View Bids</button>
              <div className="text-palette-primary px-1 py-4 text-xl font-normal">
                {"$"}
                <span className={"text-2xl"}>{`${data[5]}`}</span>
              </div>
            </div>

            <ProductForm property_RegId={params.id} price={data[5]} />
          </div>
          {showbid && (
            <BidList
              auctionContractAddress={data[3]}
              updateBid={() => updateBid(!showbid)}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
