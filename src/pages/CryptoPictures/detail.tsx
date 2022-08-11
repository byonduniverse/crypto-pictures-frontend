import { useEffect } from "react";
import { ethers } from 'ethers';
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectPictureDetail, setPictureDetail } from "../../store/picture/pictureSlice";
import contractInfo from "../../constants/contract";
import cryptoContract from "../../abis/CryptoPictures.json";
import { selectAccount } from "../../store/contract/contractSlice";
import axios from "axios";
const abi = cryptoContract.abi;

const PictureDetail = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const picture = useAppSelector(selectPictureDetail);
  const account = useAppSelector(selectAccount);

  useEffect(() => {
    const { id } = params;
    const init = async () => {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractInfo.contractAddress, abi, signer);
      if (account) {
        const data = await contract.getCryptoPictureDetail(id);
        const tokenUri = await contract.tokenURI(id);
        const { data: metadata } = await axios.get(tokenUri);
        dispatch(setPictureDetail({ ...data, ...metadata }));
      }
    };
    init();
  }, [params, dispatch, account]);

  return (
    <div className="container mx-auto">
      <div className="max-w-sm xl:w-1/2 lg:max-w-full lg:flex mx-auto mt-36">
        <div className="card w-full">
          <div className="rounded overflow-hidden shadow-lg w-full">
            <div className="grid grid-flow-col grid-cols-2">
              <div>
                <img className="w-full" src={picture.uri || ""} alt={picture.name} />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">Author: {picture.author}</div>
                </div>
              </div>
              <div className="text-left mt-4">
                <div className="px-6 py-4">
                  <div className="font-bold text-3xl mb-2 ">{picture.name}</div>
                </div>
                <div className="px-6 py-4">
                  <div className="text-gray-700 font-medium text-xl mb-2">{picture.description}</div>
                </div>
                <div className="px-6 py-4">
                  <div className="text-gray-700 font-medium text-xl mb-2">{picture.createAt}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PictureDetail;