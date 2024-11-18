import { sepolia } from "thirdweb/chains";

import { pmpTokenAbi, pmpTokenSepoliaAddress, registrarAbi, registrarAddress, auctionAddress, auctionAbi } from "./constants";
import { client } from "@/lib";
const { ethers, JsonRpcProvider } = require("ethers");
import {
  prepareEvent,
  prepareContractCall,
  readContract,
  type BaseTransactionOptions,
  type AbiParameterToPrimitiveType,
  getContract,
  sendTransaction,
  sendAndConfirmTransaction,
  PreparedTransaction,
  prepareTransaction,
} from "thirdweb";
import { getApprovalForTransaction, approve, allowance } from "thirdweb/extensions/erc20";

import { BigNumberish } from "ethers";
import toast from "react-hot-toast";


// Registrar



export const pmContract = getContract({
  client,
  address: registrarAddress,
  chain: sepolia,
  abi: registrarAbi
});

export const pmpContract = getContract({
  client,
  address: pmpTokenSepoliaAddress,
  chain: sepolia,
  abi: pmpTokenAbi
});

export const auctionContract = getContract({
  client,
  address: auctionAddress,
  chain: sepolia,
  abi: auctionAbi,
});



export const generateRwa = async (values: {
  account: any,
  rwaOwner: `0x${string}`;
  property_RegId: number;
  price: number;
}) => {
      try {
        const transaction = prepareContractCall({
          contract: pmContract,
          method: "generateRwa",
          params: [
            values.rwaOwner,
            BigInt(values.property_RegId),
            BigInt(values.price),
          ],
        });

        const { transactionHash } = await sendTransaction({
          account: values.account,
          transaction,
        });

        toast.success(transactionHash);
        return transactionHash;
      } catch (error) {
        toast.error("Transaction Failed");
        console.log("error =======================", error);
        return error;
      }
};

export const createNewRwa = async (values: {
  account: any,
  rwaOwner: `0x${string}`;
  price: number;
  property_RegId: number;
  tokenURI: string;
}) => {
    try {
      const transaction = prepareContractCall({
        contract: pmContract,
        method: "createNewRwa",
        params: [
          values.rwaOwner,
          BigInt(values.property_RegId),
          BigInt(values.price),
          values.tokenURI,
        ],
      });

      const { transactionHash } = await sendTransaction({
        account: values.account,
        transaction,
      });
      toast.success(transactionHash);
      return transactionHash;
    } catch (error) {
      toast.error("Transaction Failed");
      console.log("error =======================", error);
      return error;
    }
};

export const verificationRequest = async (values: {
  account: any;
  p_owner: string;
  property_RegId: number;
  document_url: string;
}) => {
  try {
    const transaction = prepareContractCall({
      contract: pmContract,
      method: "verification_request",
      params: [
        values.p_owner,
        BigInt(values.property_RegId),
        values.document_url,
      ],
    });

    const { transactionHash } = await sendTransaction({
      account: values.account,
      transaction,
    });

    toast.success(transactionHash);
    return transactionHash;
  } catch (error) {
    toast.error("Transaction Failed");
    console.log("error =======================", error);
    return error;
  }

};

export const transferAsset = async (values: {
  account: any;
  nftAddress: `0x${string}`;
  new_owner: `0x${string}`;
  property_RegId: number;
  price: number;
}) => {
  try {
    const transaction = prepareContractCall({
      contract: pmContract,
      method: "transferAsset",
      params: [
        values.nftAddress,
        values.new_owner,
        BigInt(values.property_RegId),
        BigInt(values.price),
      ],
    });

    const { transactionHash } = await sendTransaction({
      account: values.account,
      transaction,
    });

    toast.success(transactionHash);
    return transactionHash;
  } catch (error) {
    toast.error("Transaction Failed");
    console.log("error =======================", error);
    return error;
  }

};

export const initiateBid = async (values: {
  account: any;
  property_RegId: number; // _property_RegId
}) => {
  try {
    const transaction = prepareContractCall({
      contract: pmContract,
      method: "initiateBid",
      params: [BigInt(values.property_RegId)],
    });

    const { transactionHash } = await sendTransaction({
      account: values.account,
      transaction,
    });

    toast.success(transactionHash);
    return transactionHash;
  } catch (error) {
    toast.error("Transaction Failed");
    console.log("error =======================", error);
    return error;
  }

};

export const assets = async (values: { account: any; property_RegId: number }) => {
  try {
    const transaction = prepareContractCall({
      contract: pmContract,
      method: "assets",
      params: [values.account.address, BigInt(values.property_RegId)],
    });

    const { transactionHash } = await sendTransaction({
      account: values.account,
      transaction,
    });

    return transactionHash;
  } catch (error) {
    toast.error("Transaction Failed");
    console.log("error =======================", error);
    return error;
  }

};

export const mintToken = async (account: any, amount: BigNumberish) => {
  try {
    const transaction = prepareContractCall({
      contract: pmpContract,
      method: "mint",
      params: [account.address, BigInt(amount)],
    });

    const { transactionHash } = await sendTransaction({
      account: account,
      transaction,
    });

    return transactionHash;
  } catch (error) {
    console.log("error =======================", error);
    return error;
  }
};


export const bid = async (account: any, amount: number) => {
  try {
    const tx = approve({
      contract: pmpContract,
      spender: auctionAddress,
      amount: Number(amount),
    });

    const { transactionHash } = await sendTransaction({
      account: account,
      transaction: tx,
    });

    if (transactionHash) {
      setTimeout(async() => {
              const transaction = prepareContractCall({
                contract: auctionContract,
                method: "bid",
                params: [BigInt(amount * 1000000000000000000)],
              });
              const { transactionHash } = await sendTransaction({
                account: account,
                transaction,
              });
              toast.success(transactionHash);

      }, 7000)
    }
    return transactionHash;
  } catch (error) {
    toast.error("Transaction Failed");
    console.log("error =======================", error);
    return error;
  }

};


//const url = "https://neoxt4seed1.ngd.network";
const url = "https://11155111.rpc.thirdweb.com/";
export const providerLink = new JsonRpcProvider(url);

export const registrarContract = new ethers.Contract(
  registrarAddress,
  registrarAbi,
  providerLink
);

export const pmpTokenContract = new ethers.Contract(
  pmpTokenSepoliaAddress,
  pmpTokenAbi,
  providerLink
);



