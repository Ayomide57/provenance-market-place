"use client";
import React, { useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Formik } from "formik";
import { generateRwa } from "@/util";
import {  useState } from "react";
import { toast } from "react-hot-toast";


const GenerateRwa: React.FC = () => {
  const [show, showform] = useState<boolean>(false);

    useEffect(() => {

    }, []);


  const handleGenerateRwaSubmit = (
    values: {
      rwaOwner: any;
      property_RegId: number;
      price: number;
    },
    setSubmitting: {
      (isSubmitting: boolean): void;
      (arg0: boolean): void;
    },
  ) => {
    setTimeout(async () => {
      console.log(values);
      const response = await generateRwa(values);
      if (response.includes("0x")) toast.success(response); // Displays a success message
      setSubmitting(false);
    }, 400);
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
                rwaOwner: "",
                property_RegId: 0,
                price: 0,
              }}
              onSubmit={(values, { setSubmitting }) =>
                handleGenerateRwaSubmit(values, setSubmitting)
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
                      Owner address
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={values.rwaOwner}
                        placeholder="owner address"
                        name="rwaOwner"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.rwaOwner && touched.rwaOwner && errors.rwaOwner}
                    </div>
                  </div>{" "}
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Property Registration Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={values.property_RegId}
                        placeholder="property registration number"
                        name="property_RegId"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.property_RegId &&
                        touched.property_RegId &&
                        errors.property_RegId}
                    </div>
                  </div>{" "}
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Price
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={values.price}
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
