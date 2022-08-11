import { ethers } from "ethers";

const mintPrice = process.env.REACT_APP_MINT_PRICE || "0.0001";
const contract = {
  contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS || "",
  mintPrice: ethers.utils.parseEther(mintPrice)
};

export default contract;
