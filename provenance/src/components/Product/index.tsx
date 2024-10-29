"use client";
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { registrarContract } from '@/util';
import { BigNumberish } from 'ethers';


export type Product = {
  id: any;
  handle: string;
  title: string;
  description: string;
  imageNode: string;
  p_owner: string;
  nftAddress: string;
  property_RegId: BigNumberish;
  survey_zip_code: BigNumberish;
  survey_number: BigNumberish;
  document_url: string;
  value: BigNumberish;
  verified: boolean;
  existed: boolean;
};



function ProductListings() {
  
    const [data, setProperties] = useState<any>([]);

  const queryRwaEvents = React.useCallback(async () => {
    const events = await registrarContract.queryFilter("AssetVerified");
    const filterVal: Product[] = [];
    events.map((event: { args: { tokenId: any; property_RegId: any; p_owner: any; nftAddress: any; survey_zip_code: any; survey_number: any; value: any; verified: any; existed: any; }; }) => {
      return (
        event.args &&
        filterVal.push({
          id: event.args.tokenId,
          handle: `/marketplace/product-detail/${event.args.property_RegId}/${event.args.p_owner}`,
          title: "The Unicorn",
          description: "You know he's got his own personal stylist.",
          imageNode: "/house.jpg",
          p_owner: event.args.p_owner,
          nftAddress: event.args.nftAddress,
          property_RegId: event.args.property_RegId,
          survey_zip_code: event.args.survey_zip_code,
          survey_number: event.args.survey_number,
          document_url: event.args.survey_number,
          value: event.args.value,
          verified: event.args.verified,
          existed: event.args.existed,
        })
      );
    });
    setProperties(filterVal);
  }, []);

    useEffect(() => {
      queryRwaEvents();
    }, [ data, queryRwaEvents]);



  return (
    <div className="py-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
      {
        data.map((product: any, index: any) => (
          <ProductCard key={index} product={product} />
        ))
      }
    </div>
  )
}




export default ProductListings

function async(arg0: () => void) {
  throw new Error('Function not implemented.');
}
