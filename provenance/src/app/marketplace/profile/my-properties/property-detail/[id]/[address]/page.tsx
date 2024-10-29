"use client";
import ProductForm from "@/components/ProductForm";
import ProductImage from "@/components/ProductImage";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import { assets } from "@/util";
import React from "react";
import { BigNumberish } from "ethers";
import { Product } from "@/types/property";



function ProductDetail({
  params,
}: {
  params: { id: string; address: `0x${string}` };
}) {
  const [productData, setProperties] = useState<Product>();
  const title = "The Unicorn";
  const images = [
    { originalSrc: "/house.jpg", altText: "house" },
    { originalSrc: "/house.jpg", altText: "house" },
  ];

      const product: any =  assets({
        address: params.address,
        property_RegId: Number(params.id),
      });
      console.log(product);

      const fetchIPFSInfo = React.useCallback(async () => {
        const data = await fetch(
          "https://ipfs.io/ipfs/QmbKbzFYc5vX83CwLadwxHGBjer3AN9HTY2hmeai7XSSbp/0",
          { headers: { Accept: "application/json" } },
        );
        //const newJson = JSON.parse(`${ json }`);
        //const obj = JSON.parse('{"name":"John", "age":30, "city":"New York"}');
        const jsonRp = await data.json();
        console.log("data ===========================", jsonRp.data.name);
      }, []);

  useEffect(() => {
    //queryProductData();
    fetchIPFSInfo();
  }, [fetchIPFSInfo, params.id, productData]);

  return (
    <div className="min-h-screen py-12 sm:pt-20">
      {productData != undefined && (
        <div className="max-w-8xl mx-auto flex w-11/12 flex-col items-center justify-center space-y-4 md:flex-row md:items-start md:space-x-4 md:space-y-0 lg:space-x-9">
          <ProductImage images={images} />
          <div className="min-h-128 mx-auto flex h-full w-full max-w-xs flex-col justify-between space-y-4 md:w-1/2">
            <Link
              href="/"
              passHref
              aria-label="back-to-products"
              className="border-palette-primary text-palette-primary font-primary focus:ring-palette-light hover:bg-palette-lighter flex w-full items-center justify-center rounded-sm 
      border pb-1 pt-2 text-lg font-semibold leading-relaxed focus:outline-none focus:ring-1"
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="mr-2 inline-flex w-4"
              />
              Back To All Products
            </Link>
            <div className=" font-primary">
              <h1 className="text-palette-primary py-2 text-3xl font-extrabold leading-relaxed sm:py-4">
                {title}
              </h1>
              <p className="text-lg font-medium">
                p_owner: {productData.p_owner}
              </p>
              <p className="text-lg font-medium">
                nftAddress: {productData.nftAddress}
              </p>
              <p className="text-lg font-medium">
                property_RegId: {`${productData.property_RegId}`}
              </p>
              <p className="text-lg font-medium">
                survey_zip_code: {`${productData.survey_zip_code}`}
              </p>
              <p className="text-lg font-medium">
                survey_number: {`${productData.survey_number}`}
              </p>
              <p className="text-lg font-medium">
                value: {`${productData.value}`}
              </p>
              <Link
                href={"/"}
              >
                View Info
              </Link>
              <div className="text-palette-primary px-1 py-4 text-xl font-medium">
                {"$"}
                <span className={"text-2xl"}>{`${productData.value}`}</span>
              </div>
            </div>
            <ProductForm property_RegId={params.id} price={productData.value} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
