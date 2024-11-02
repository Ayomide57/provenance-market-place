"use client";
import Modal from "@/components/Modal";
import { verificationRequest, assets } from "@/util";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { client, UploadImages, UploadToStorage } from "@/lib";
import Link from "next/link";
import { PropertyMetaData } from "@/types/property";
import { upload } from "thirdweb/storage";
import { useActiveAccount } from "thirdweb/react";

const VerificationRequest = () => {
  const smartAccount = useActiveAccount();

  let property_metadata: PropertyMetaData = {
        name: "string",
        address: "",
        description: "",
        images: [],
        document_url: "",
        property_Reg_Id: 0,
        attributes: [],
      };

  const [ipfsLink, updateLink] = useState<string[] | undefined>();
  const [tokenURI, updatetokenURI] = useState<string | undefined>();

  const [ipfsImages, updateImagesLink] = useState<string[] | undefined>();

    const handleVerificationRequestSubmit = async (
      values: {
        name: string;
        address: string;
        description: string;
        p_owner: any;
        property_RegId: number | null;
        survey_zip_code: number | null;
        survey_number: number | null;
        tokenURI: string;
      }
    ) => {
      values.p_owner = smartAccount && smartAccount?.address;
      property_metadata.name = values.name;
      property_metadata.address = values.address;
      property_metadata.description = values.description;
      property_metadata.property_Reg_Id = values.property_RegId
        ? values.property_RegId
        : 0;
      property_metadata.images = ipfsImages ? ipfsImages : [];
      property_metadata.document_url = ipfsLink ? ipfsLink[0] : "";
      property_metadata.attributes = [
        {
          trait_type: "Survey Zip Code",
          value: values.survey_zip_code,
        },
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
      updatetokenURI(uris);

      const response:any = await verificationRequest({  
        account: smartAccount,
        p_owner: smartAccount ? smartAccount.address : "",
        property_RegId: values.property_RegId ? values.property_RegId : 0,
        document_url: uris
    });
      if (response.includes("0x")) {
        toast.success(response); // Displays a success message
      } else {
        toast.error("Failed")
      }
  };

  useEffect(() => {
    //console.log(ipfsLink);
    //console.log("ipfsImages ===================================", ipfsImages);
  }, [ipfsLink, ipfsImages]);
    
    return (
      <div className="ml-20">
        <Formik
          initialValues={{
            p_owner: smartAccount && smartAccount?.address,
            name: "",
            address: "",
            description: "",
            property_RegId: null,
            survey_zip_code: null,
            survey_number: null,
            tokenURI: tokenURI ? tokenURI : "",
          }}
          onSubmit={(values, { setSubmitting }) =>
            handleVerificationRequestSubmit(values)
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
            <form className="mb-4 w-full rounded-lg bg-gray-900 px-8 pb-8 pt-6 opacity-75 shadow-lg">
              <div className="flex justify-between">
                <h1 className="mb-10 block py-2 text-2xl font-bold text-white">
                  Verify your property and generate your token
                </h1>
              </div>
              <UploadImages updateLink={updateImagesLink} />
              <UploadToStorage updateLink={updateLink} />
              <div className="mb-4">
                <label className="mb-2 block py-2 font-bold text-white">
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    //value={values.name}
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.name && touched.name && errors.name}
                </div>
              </div>
              <div className="mb-4">
                <label className="mb-2 block py-2 font-bold text-white">
                  Property Address
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    //value={values.address}
                    placeholder="Property address"
                    name="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.address && touched.address && errors.address}
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 block py-2 font-bold text-white"
                  htmlFor={"property_RegId"}
                >
                  Property Registration Number
                </label>
                <input
                  required
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="property_RegId"
                  type="number"
                  name="property_RegId"
                  placeholder="12345"
                  //value={values.property_RegId}
                  onChange={handleChange}
                />
                {errors.property_RegId &&
                  touched.property_RegId &&
                  errors.property_RegId}
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 block py-2 font-bold text-white"
                  htmlFor={"survey_zip_code"}
                >
                  Survey Zip Code
                </label>
                <input
                  required
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="survey_zip_code"
                  type="number"
                  name="survey_zip_code"
                  placeholder="12345"
                  //value={values.survey_zip_code}
                  onChange={handleChange}
                />
                {errors.survey_zip_code &&
                  touched.survey_zip_code &&
                  errors.survey_zip_code}
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 block py-2 font-bold text-white"
                  htmlFor={"survey_number"}
                >
                  Survey Number
                </label>
                <input
                  required
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="survey_number"
                  type="number"
                  name="survey_number"
                  placeholder="12345"
                  //value={values.survey_number}
                  onChange={handleChange}
                />
                {errors.survey_number &&
                  touched.survey_number &&
                  errors.survey_number}
              </div>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-white dark:text-white">
                  Description
                </label>
                <div className="relative">
                  <textarea
                    required
                    //value={values.description}
                    placeholder="Description"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.description &&
                    touched.description &&
                    errors.description}
                </div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <button
                  className="transform rounded bg-gradient-to-r from-purple-800 to-green-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:from-pink-500 hover:to-green-500 focus:ring"
                  type="button"
                  onClick={() => handleSubmit()}
                >
                  Verify
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
};

export default VerificationRequest;

    /******
     * address: 92 Corey St, Boston, MA 02132
     * Name: Spacious home in the heart of West Roxbury with 3 floors of living
     * user: 0x15427D97E45e3374DF934B0f1292C8556D1B79DD
     * price: 175000
     * zipcode: 02132
     * reg: 127
     * Survey Number: 1104789
     * desc: The epitome of convenience. Located close to all that Centre St has to offer: 
     * restaurants, shops, gyms, Roche Bros supermarket, commuter rail line and bus lines (walk score: 89). 
     * Spacious home in the heart of West Roxbury with 3 floors of living. This home features high ceilings, 
     * hardwood floors throughout, spacious kitchen that flows smoothly to the dining room and living room, 
     * and first floor laundry. On the 2nd floor there is a full bath, and three large bedrooms with hardwood 
     * floors and sizable closets. One bedroom has direct access to deck. The 3rd floor has another full bath, 
     * a bedroom, and bonus room with exposed brick for another bedroom, home office or workout area. 
     * The home offers charming woodwork and character but also features some modern 
     * day conveniences including central air and Nest Thermostats. Exclusive use of a two-car garage.
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     */
