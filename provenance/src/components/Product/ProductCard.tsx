"use client";
import Image from 'next/image'
import Link from 'next/link'

function ProductCard({ product }: any) {
  
  const handle = `${product.handle}`;
  const title = product.title;
  const description = product.description;
  const price = `${ product.value }`;
  const altText = product.title;
  const imageNode = product.imageNode

  return (
    <Link
      href={`${handle}`}
      passHref
    >
      <div className="h-120 w-72 rounded shadow-lg mx-auto border border-palette-lighter">
        <div className="h-72 border-b-2 border-palette-lighter relative">
          <Image
            src={imageNode}
            alt={altText}
            layout="fill"
            className="transform ease-in-out hover:scale-110"
          />
        </div>
        <div className="h-48 relative">
          <div className="font-primary text-palette-primary text-2xl pt-4 px-4 font-semibold">
            {title}
          </div>
          <div className="text-lg text-gray-600 p-4 font-primary font-light">
            {description}
          </div>
          <div
            className="text-palette-dark font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-palette-lighter 
            rounded-tl-sm triangle"
          >
            {"$"}<span className="text-lg">{price}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard