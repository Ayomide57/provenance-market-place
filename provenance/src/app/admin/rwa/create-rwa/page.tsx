"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { createNewRwa } from "@/util";
import { Formik } from "formik";
import { toast } from "react-hot-toast";
import { UploadToStorage, UploadImages, client } from "@/lib";
import { upload } from "thirdweb/storage";
import { PropertyMetaData } from "@/types/property";



const CreateRwa: React.FC = () => {
  let property_metadata: PropertyMetaData = {name: "string",address: "",description: "",images: [],document_url: "",property_Reg_Id: 0, attributes: []};

  const [ipfsLink, updateLink] = useState<string[] | undefined>([
    "ipfs://QmNoVnHakRYX24dyVozMs7QXHDa4DvT7rqxPFif7zQkd8Y/if%20i%20were%20a%20boy.jpg",
  ]);
  const [tokenURI, updatetokenURI] = useState<string | undefined>();

      const [ipfsImages, updateImagesLink] = useState<string[] | undefined>(["ipfs://QmNoVnHakRYX24dyVozMs7QXHDa4DvT7rqxPFif7zQkd8Y/if%20i%20were%20a%20boy.jpg",
"ipfs://QmNoVnHakRYX24dyVozMs7QXHDa4DvT7rqxPFif7zQkd8Y/Jonas%20Blue%20-%20Rise%20ft.%20Jack%20%26%20Jack%20(Official%20Video).jpg",
"ipfs://QmNoVnHakRYX24dyVozMs7QXHDa4DvT7rqxPFif7zQkd8Y/Little%20Mix%20-%20Secret%20Love%20Song%20(Official%20Video)%20ft.%20Jason%20Derulo.jpg",
        "ipfs://QmNoVnHakRYX24dyVozMs7QXHDa4DvT7rqxPFif7zQkd8Y/Screenshot%202024-10-03%20at%2014.41.33.png"]);

      const handleCreateNewRwaSubmit = (
        values: {
          name: string;
          address: string;
          description: string;
          rwaOwner: any;
          price: number;
          property_RegId: number;
          survey_zip_code: number;
          survey_number: number;
          tokenURI: string;
        },
        setSubmitting: { (isSubmitting: boolean): void; (arg0: boolean): void },
      ) => {
        setTimeout(async () => {
          console.log("values =======================", values);
          property_metadata.name = values.name;
          property_metadata.address = values.address;
          property_metadata.description = values.description;
          property_metadata.property_Reg_Id = values.property_RegId;
          property_metadata.images = ipfsImages ? ipfsImages : [];
          property_metadata.document_url = ipfsLink ? ipfsLink[0] : "";
          property_metadata.attributes = [
            { trait_type: "Survey Zip Code", value: values.survey_zip_code },
            { trait_type: "Survey Number", value: values.survey_number },
          ];
          values.tokenURI = tokenURI ? tokenURI : "";

          console.log("property_metadata =====================", property_metadata);
          /**const fileBuffer = Buffer.from(
            JSON.stringify(property_metadata),
          );**/
          const uris = await upload({
                client,
                files: [
                  {
                    name: "property",
                    data: property_metadata,
                  },
                ],
          });

          console.log("fileBuffer ============================", uris);

          //const response = await createNewRwa(values);
          //if (response.includes("0x")) toast.success(response); // Displays a success message
          //console.log(values);
          setSubmitting(false);
        }, 400);
      };

  useEffect(() => {
        //console.log(ipfsLink);
        //console.log("ipfsImages ===================================", ipfsImages);
      }, [ipfsLink, ipfsImages]);


  return (
    <>
      <Breadcrumb pageName="Create RWA Token" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Create RWA
            </h2>
            <Formik
              initialValues={{
                name: "",
                address: "",
                description: "",
                rwaOwner: "",
                price: 0,
                property_RegId: 0,
                survey_zip_code: 0,
                survey_number: 0,
                tokenURI: tokenURI ? tokenURI : "",
              }}
              onSubmit={(values, { setSubmitting }) =>
                handleCreateNewRwaSubmit(values, setSubmitting)
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
                  <UploadImages updateLink={updateImagesLink} />
                  <UploadToStorage updateLink={updateLink} />
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={values.name}
                        placeholder="Name"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.name && touched.name && errors.name}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Property Address
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={values.address}
                        placeholder="Property address"
                        name="address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.address && touched.address && errors.address}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Owner address
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={values.rwaOwner}
                        placeholder="Owner address"
                        name="rwaOwner"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.rwaOwner && touched.rwaOwner && errors.rwaOwner}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Price
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Amount"
                        name="price"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.price}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.price && touched.price && errors.price}
                    </div>
                  </div>{" "}
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Property Registration Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="property registration number"
                        name="property_RegId"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.property_RegId}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.property_RegId &&
                        touched.property_RegId &&
                        errors.property_RegId}
                    </div>
                  </div>{" "}
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Survey Zip Code
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="survey zip code"
                        name="survey_zip_code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.survey_zip_code}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.survey_zip_code &&
                        touched.survey_zip_code &&
                        errors.survey_zip_code}{" "}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Survey Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="survey number"
                        name="survey_number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.survey_number}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.survey_number &&
                        touched.survey_number &&
                        errors.survey_number}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Description
                    </label>
                    <div className="relative">
                      <textarea
                        value={values.description}
                        placeholder="Description"
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.description &&
                        touched.description &&
                        errors.description}
                    </div>
                  </div>
                  <div className="mb-5">
                    <input
                      type="submit"
                      value="Create New NFT"
                      disabled={isSubmitting}
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

export default CreateRwa;
