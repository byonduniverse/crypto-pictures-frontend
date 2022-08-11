import { useEffect } from "react";
import { ethers } from 'ethers';

import { selectAccount } from "../../store/contract/contractSlice";
import cryptoContract from "../../abis/CryptoPictures.json";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectPictures, setPictures } from "../../store/picture/pictureSlice";
import contractInfo from "../../constants/contract";
import PictureCard from "../../components/PictureCard";
import { useNavigate } from "react-router-dom";
const abi = cryptoContract.abi;

const List = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectAccount);
  const pictures = useAppSelector(selectPictures);

  useEffect(() => {
    const init = async () => {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractInfo.contractAddress, abi, signer);
      if (account) {
        const pictureIds = await contract.getCryptoPictures(account);
        let pictures = [];
        for (const id of pictureIds) {
          const picture = await contract.getCryptoPictureDetail(id);
          pictures.push({ ...picture, id: id.toNumber() });
        }
        dispatch(setPictures(pictures));
      }
    };
    init();
  }, [account, dispatch]);

  const onClick = (id: number) => {
    navigate(`/pictures/${id}`);
  };

  const handleMint = () => {
    navigate('/pictures/mint');
  };

  return (
    <div className="container mx-auto">
      <header className="h-16 w-full">
        <h1 className="text-violet-700 text-4xl">
          My Pictures
        </h1>
      </header>
      <div className="grid grid-cols-4 grid-flow-col gap-4">
        {!!pictures.length &&
          pictures.map(picture => {
            return <PictureCard picture={picture} key={picture.id} handleClick={onClick} />;
          })
        }
      </div>
      <div className="my-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5" type="button" onClick={handleMint}>
          Mint
        </button>
      </div>
    </div>
  );
};

export default List;