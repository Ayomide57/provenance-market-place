"use client";
import { registrarContract } from "@/util";
import * as React from "react";

import { Input } from "@/components/ui/input";
import ProductListings from "@/components/Product";

const MarketPlace = () => {


  return (
    <>
    <div className="mx-auto max-w-6xl">
        <ProductListings />      
    </div>
    </>
  );
};







export default MarketPlace;
