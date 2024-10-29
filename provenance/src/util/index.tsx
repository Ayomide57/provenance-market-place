import { config, NeoX } from "@/util/config";
import { sepolia } from "thirdweb/chains";

import { registrarAbi, registrarAddresses } from "./constants";
import { client } from "@/lib";
const { ethers, JsonRpcProvider } = require("ethers");
import {
  prepareEvent,
  prepareContractCall,
  readContract,
  type BaseTransactionOptions,
  type AbiParameterToPrimitiveType,
  getContract,
} from "thirdweb";
import { useReadContract } from "thirdweb/react";


// Registrar



export const contract = getContract({
  client,
  address: registrarAddresses,
  chain: sepolia,
  //abi: registrarAbi
});


export const generateRwa = async (values: {
  rwaOwner: `0x${string}`;
  property_RegId: number;
  price: number;
}) => {
  const response = await writeContract(config, {
    address: registrarAddresses,
    abi: registrarAbi,
    functionName: "generateRwa",
    args: [
      values.rwaOwner,
      BigInt(values.property_RegId),
      BigInt(values.price),
    ],
  });
  return response;
};

export const createNewRwa = async (values: {
  rwaOwner: `0x${string}`;
  price: number;
  property_RegId: number;
  survey_zip_code: number;
  survey_number: number;
  tokenURI: string;
}) => {
  const response = await writeContract(config, {
    address: registrarAddresses,
    abi: registrarAbi,
    functionName: "createNewRwa",
    args: [
      values.rwaOwner,
      BigInt(values.property_RegId),
      BigInt(values.price),
      BigInt(values.survey_zip_code),
      BigInt(values.survey_number),
      values.tokenURI,
    ],
  });
  return response;
};

export const verificationRequest = async (values: {
  p_owner: `0x${string}`;
  property_RegId: number;
  survey_zip_code: number;
  survey_number: number;
  document_url: string;
}) => {
  const response = await writeContract(config, {
    abi: registrarAbi,
    functionName: "verification_request",
    args: [
      values.p_owner,
      BigInt(values.property_RegId),
      BigInt(values.survey_zip_code),
      BigInt(values.survey_number),
      values.document_url,
    ],
    address: registrarAddresses,
  });
  return response;
};

/**export const transferAsset = async (values: {
  tokenId: number;
  newOwner: `0x${string}`;
  property_RegId: number;
}) => {
  const response = await writeContract(config, {
    address: registrarAddresses,
    abi: registrarAbi,
    functionName: "transferAsset",
    args: [BigInt(values.tokenId), values.newOwner, BigInt(values.property_RegId)],
  });
  return response;
};**/

export const assets = async (values: {
  address: string;
  property_RegId: number;
}) => {

  const response = await useReadContract({
    contract: contract,
    method: "function assets(address p_owner, uint256 property_RegId) returns(bool verified, bool existed, address p_owner, address nftAddress, uint256 property_RegId, uint256 value, string document_url, uint256 auctionEndTime)",
    params: [values.address, BigInt(values.property_RegId)],
  });
  console.log("response ==================", response.data);

  return response;
};

const url = "https://neoxt4seed1.ngd.network";
const provider = new JsonRpcProvider(url);

export const registrarContract = new ethers.Contract(
  registrarAddresses,
  registrarAbi,
  provider,
);
