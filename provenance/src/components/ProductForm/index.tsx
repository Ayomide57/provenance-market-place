import { SetStateAction, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { assets } from "@/util";

function ProductForm({ property_RegId, price }: any) {
  const [quantity, setQuantity] = useState<any>(0);


  const atcBtnStyle = `pt-3 pb-2 bg-gradient-to-r from-purple-800 to-green-500 text-white w-full mt-2 rounded-sm font-primary font-semibold text-xl flex 
                        justify-center items-baseline hover:bg-palette-dark`;

  async function handleAddToCart() {
    // update store context
    //if (quantity !== 0 && account) {
    /**assets({
        address: account,
        property_RegId: property_RegId,
      });**/
    //}
  }

  function updateQuantity(value: string | SetStateAction<number>) {
    if (value === 0) {
      setQuantity(0);
    } else {
      setQuantity(value);
    }
  }

  return (
    <div className="w-full">
      <div className="flex w-full justify-start ">
        <div className="flex flex-grow-0 flex-col items-start space-y-1">
          <label className="text-base text-gray-500">Qty.</label>

          <input
            type="number"
            inputMode="numeric"
            id="quantity"
            name="quantity"
            min="1"
            step="1"
            //value={quantity}
            onChange={(e) => updateQuantity(e.target.value)}
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
      </div>
      <button
        className={atcBtnStyle}
        aria-label="cart-button"
        onClick={handleAddToCart}
      >
        Bid
        <FontAwesomeIcon icon={faShoppingCart} className="ml-2 w-5" />
      </button>
    </div>
  );
}

export default ProductForm;
