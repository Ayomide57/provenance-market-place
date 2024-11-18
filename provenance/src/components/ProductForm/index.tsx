import { SetStateAction, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { assets, bid, pmpContract } from "@/util";
import { TransactionButton, useActiveAccount } from "thirdweb/react";
import toast from "react-hot-toast";
import { Formik } from "formik";
import { approve } from "thirdweb/extensions/erc20";
import { auctionAddress } from "@/util/constants";

function ProductForm({ auctionContractAddress, property_RegId, price }: any) {
  const smartAccount = useActiveAccount();
  const [bidAmount, updateBid] = useState();

  const atcBtnStyle = `pt-3 pb-2 bg-gradient-to-r from-purple-800 to-green-500 text-white w-full mt-2 rounded-sm font-primary font-semibold text-xl flex 
                        justify-center items-baseline hover:bg-palette-dark`;

  const handleBid = async (values: { amount: number }) => {
    if (smartAccount?.address) {
      console.log(values.amount);
      const response: any = await bid(smartAccount, values.amount);
      /**if (response.includes("BidNotHighEnough")) {
              toast.error("BidNotHighEnough");
          } else if (response.includes("AuctionHasEnded")) {
            toast.error("AuctionHasEnded");
          } else {
              toast.success(response);
            }**/
      //toast.error(error);
      console.log("response =======================", response);
    }
  };

  useEffect(() => {});

  return (
    <div className="w-full">
      <Formik
        initialValues={{
          amount: 0,
        }}
        onSubmit={(values) => handleBid(values)}
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
            <div
              className="flex w-full justify-start"
              style={{ width: "-webkit-fill-available" }}
            >
              <div
                className="flex flex-grow-0 flex-col items-start space-y-1"
                style={{ width: "-webkit-fill-available" }}
              >
                <label className="text-base text-white">Amount.</label>
                <input
                  style={{ width: "-webkit-fill-available" }}
                  type="number"
                  id="quantity"
                  name="amount"
                  value={values.amount}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
            <button
              className={atcBtnStyle}
              aria-label="cart-button"
              type="submit"
            >
              Bid
              <FontAwesomeIcon icon={faShoppingCart} className="ml-2 w-5" />
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default ProductForm;
