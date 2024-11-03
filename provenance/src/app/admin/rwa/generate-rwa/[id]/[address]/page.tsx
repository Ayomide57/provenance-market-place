"use client";
import React, { useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Formik } from "formik";
import { generateRwa, pmContract } from "@/util";
import {  useState } from "react";
import { toast } from "react-hot-toast";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { Product } from "@/app/marketplace/product-details/[id]/[address]/page";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";


const GenerateRwa = ({
  params,
}: {
  params: { id: string; address: `0x${string}` };
}) => {
  const smartAccount = useActiveAccount();
  const [productData, setProperties] = useState<Product>();
  const [linkVideo, updateVideoLink] = useState<any[]>();

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

  const handleGenerateRwaSubmit = async (
    values: {
      account: any;
      rwaOwner: any;
      property_RegId: number;
      price: number;
    },
  ) => {
    values.account = smartAccount;
    values.rwaOwner = params.address;
    values.property_RegId = Number(params.id);
      const response: any = await generateRwa(values);
      if (response) toast.success(response); // Displays a success message
  };
  return (
    <>
      <Breadcrumb pageName="Generate RWA Token" />

      <div className="flex rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Generate RWA
            </h2>

            <Formik
              initialValues={{
                account: null,
                rwaOwner: "",
                property_RegId: 0,
                price: 0,
              }}
              onSubmit={(values) => handleGenerateRwaSubmit(values)}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Price
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        //value={values.price}
                        placeholder="Price"
                        name="price"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.price && touched.price && errors.price}
                    </div>
                  </div>{" "}
                  <div className="mb-5">
                    <input
                      type="button"
                      value="Generate NFT"
                      onClick={() => handleSubmit()}
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    />
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
        {data != undefined && productData && (
          <div className="xl:w-1/2 p-10">
            <div className=" font-primary text-black">
              <h1 className="py-2 text-2xl font-extrabold leading-relaxed text-black sm:py-4">
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
              <br />
              <Link href={productData ? productData?.document_url : ""}>
                View Asset Document
              </Link>
              <br />
              <div className="text-palette-primary px-1 py-4 text-xl font-normal">
                {"$"}
                <span className={"text-2xl"}>{`${data[5]}`}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GenerateRwa;
