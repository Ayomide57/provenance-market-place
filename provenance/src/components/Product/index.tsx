"use client";
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { registrarContract } from '@/util';
import { BigNumberish } from 'ethers';


export type Product = {
  id: any;
  handle: string;
  p_owner: string;
  nftAddress: string;
  property_RegId: BigNumberish;
  document_url: string;
  value: BigNumberish;
  verified: boolean;
  existed: boolean;
};



function ProductListings() {
  
  const [data, setProperties] = useState<any>([]);


  const queryRwaEvents = React.useCallback(async () => {
    const events = await registrarContract.queryFilter("EventAssetVerified");
    const filterVal: Product[] = [];
    events.map(
       (event: {
        args: {
          tokenId: any;
          property_RegId: any;
          p_owner: any;
          nftAddress: any;
          survey_zip_code: any;
          survey_number: any;
          value: any;
          verified: any;
          existed: any;
          document_url: string;
        };
      }) => {
        return (
          event.args &&
          filterVal.push({
            id: event.args.tokenId,
            handle: `/marketplace/product-details/${event.args.property_RegId}/${event.args.p_owner}`,
            p_owner: event.args.p_owner,
            nftAddress: event.args.nftAddress,
            property_RegId: event.args.property_RegId,
            document_url: event.args.document_url,
            value: event.args.value,
            verified: event.args.verified,
            existed: event.args.existed,
          })
        );
      },
    );
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
