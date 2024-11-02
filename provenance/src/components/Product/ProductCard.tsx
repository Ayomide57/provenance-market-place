"use client";
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react';

function ProductCard({ product }: any) {

  const [metadata, setMetadata] = useState<any>([]);
  
  const handle = `${product.handle}`;
  const price = `${ product.value }`;
  const altText = product.title;



  const getPropertyMetadata = useCallback(async () => {
    const ipfs = await fetch(
      product.document_url.replace("ipfs://", "https://ipfs.io/ipfs/"),
      {
        headers: { Accept: "application/json" },
      },
    );
    const jsonRp = await ipfs.json();
    const jsonReturn = [
      jsonRp.data.name,
      jsonRp.data.description,
      jsonRp.data.images[0].replace("ipfs://", "https://ipfs.io/ipfs/"),
    ];
    setMetadata(jsonReturn);
    return jsonReturn;
  }, [product.document_url]);
  
  useEffect(() => {
    getPropertyMetadata();
  }, [getPropertyMetadata, metadata]);
  

  return (
    <Link href={`${handle}`} passHref>
      <div className="h-120 border-palette-lighter mx-auto w-72 rounded border shadow-lg">
        <div className="border-palette-lighter relative h-72 border-b-2">
          <Image
            src={metadata[2]}
            alt={altText}
            layout="fill"
            className="transform ease-in-out hover:scale-110"
          />
        </div>
        <div className="relative h-48">
          <div className="font-primary text-palette-primary px-4 pt-4 text-2xl font-semibold">
            {metadata[0]}
          </div>
          <div
            className="text-palette-dark font-primary bg-palette-lighter triangle absolute bottom-0 right-0 mb-4 rounded-tl-sm pb-1 pl-8 pr-4 pt-2 
            text-base font-medium"
          >
            {"$"}
            <span className="text-lg">{price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard