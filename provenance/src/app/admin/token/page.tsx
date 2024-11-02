"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useActiveAccount } from "thirdweb/react";
import { balanceOf } from "thirdweb/extensions/erc20";
import { mintToken, pmpContract } from "@/util";
import { BigNumberish } from "ethers";
import { Formik } from "formik";
import toast from "react-hot-toast";


const Token: React.FC = () => {
    const smartAccount = useActiveAccount();
    const [token, setToken] = useState<BigNumberish>();


    const fetchAccount = React.useCallback(async () => {
        if (smartAccount?.address) {
            const result = await balanceOf({
                contract: pmpContract,
                address: smartAccount?.address,
            });
            const val = Number(result) / 1000000000000000000;
            setToken(val);
        }

    }, [smartAccount?.address]);
    
    const handleMintTokenSubmit = async (values: {amount: number }) => {
        if (smartAccount?.address) {
          const response: any = await mintToken(
            smartAccount,
            BigInt(values.amount),
          );
          console.log(response);
            if (response.includes("0x")) {
              toast.success(response);
            } else { toast.error(response); };
        }
    };

    useEffect(() => {
        fetchAccount();
        console.log(token);
    }, [fetchAccount, token]);


  return (
    <>
      <Breadcrumb pageName="MY Token" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <h1 className="text-md text-blue-950">My PMP Token Balance</h1>

              <p className="2xl:px-20">PMP: {`${token}`}</p>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Mint Token</span>

              <Formik
                initialValues={{
                  amount: 0,
                }}
                onSubmit={(values, { setSubmitting }) =>
                  handleMintTokenSubmit(values)
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
                    <div className="mb-6">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Amount
                      </label>
                      <div className="relative">
                        <input
                          required
                          value={values.amount}
                          name="amount"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="number"
                          placeholder="Amount"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    >
                      Mint
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Token;
