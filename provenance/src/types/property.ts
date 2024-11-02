import { BigNumberish } from "ethers";

export interface PropertyMetaData {
  name: string;
  address: string;
  description: string;
  images: string[];
  document_url: string;
  property_Reg_Id: number;
  attributes: any[];
}

export type Asset = {
  id: any;
  p_owner: string;
  nftAddress: string;
  property_RegId: BigNumberish;
  value: BigNumberish;
  verified: boolean;
};

export type Product = {
  verified: boolean;
  existed: boolean;
  p_owner: string;
  nftAddress: string;
  property_RegId: BigNumberish;
  survey_zip_code: BigNumberish;
  survey_number: BigNumberish;
  value: BigNumberish;
  document_url: string;
  tokenId: BigNumberish;
};


