"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { createNewRwa } from "@/util";
import { Formik } from "formik";
import { toast } from "react-hot-toast";
import { UploadToStorage, UploadImages, client } from "@/lib";
import { upload } from "thirdweb/storage";
import { PropertyMetaData } from "@/types/property";
import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/router";



const CreateRwa: React.FC = () => {
  let property_metadata: PropertyMetaData = {name: "string",address: "",description: "",images: [],document_url: "",property_Reg_Id: 0, attributes: []};
    const smartAccount = useActiveAccount();
const router = useRouter();

  const [ipfsLink, updateLink] = useState<string[] | undefined>();
  const [tokenURI, updatetokenURI] = useState<string | undefined>();

      const [ipfsImages, updateImagesLink] = useState<string[] | undefined>();

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
          //console.log("values =======================", values);
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

          const uris = await upload({
                client,
                files: [
                  {
                    name: "property",
                    data: property_metadata,
                  },
                ],
          });
          
          updatetokenURI(uris)

          const response: any = await createNewRwa({
            account: smartAccount,
            rwaOwner: values.rwaOwner,
            price: values.price,
            property_RegId: values.property_RegId,
            tokenURI: uris
          });
          console.log(response); // Displays a success message
          router.reload();
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


//address 290 Columbus Ave UNIT 3, Boston, MA 02116
// name: Jewelry Box in a premier location, heart of the South End
//zipcode: 02116
// user: 0xACb7FD6e100CBEf3acE933E4c2389C52148B4c5E
// price: 200000
// reg Number: 12345
// survey number: 112345
/**desc: A true “Jewelry Box” in a premier location in the heart of the South End yet steps from Back Bay! 
This rear facing residence includes in unit laundry & an exclusive use private outdoor space.There is a stunning 
 kitchen with full sized appliances;  beautiful natural sunlight streaming through the oversized windows &
  is quiet as it is rear facing.A few of the best features include gas heating & central air.Low association 
  fee includes heat & hot water.A premier location close to trendy restaurants, cozy cafes, chic boutiques &
  Back Bay Train Station.Pet friendly & 100 % move in ready.

**/
