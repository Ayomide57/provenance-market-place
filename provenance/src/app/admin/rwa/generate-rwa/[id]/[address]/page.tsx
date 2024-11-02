"use client";
import React, { useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Formik } from "formik";
import { generateRwa } from "@/util";
import {  useState } from "react";
import { toast } from "react-hot-toast";
import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/router";


const GenerateRwa = ({
  params,
}: {
  params: { id: string; address: `0x${string}` };
}) => {
  const [show, showform] = useState<boolean>(false);
  const smartAccount = useActiveAccount();
  const router = useRouter();

  useEffect(() => {}, []);

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
    router.reload();

  };
  return (
    <>
      <Breadcrumb pageName="Generate RWA Token" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
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
              onSubmit={(values) =>
                handleGenerateRwaSubmit(values)
              }
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
      </div>
    </>
  );
};

export default GenerateRwa;
