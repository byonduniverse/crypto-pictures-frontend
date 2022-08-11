import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

import PictureForm from "../../components/PictureForm";
import { PictureDetail } from "../../constants/types";
import contractInfo from "../../constants/contract";
import cryptoContract from "../../abis/CryptoPictures.json";
import { useAppSelector } from "../../store/hooks";
import { selectAccount } from "../../store/contract/contractSlice";
import { ipfs } from "../../api/ipfs";

const abi = cryptoContract.abi;

const PictureMint = () => {
  const navigate = useNavigate();
  const account = useAppSelector(selectAccount);

  const onBack = () => {
    navigate("/");
  };

  const onSubmit = async (values: PictureDetail) => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractInfo.contractAddress, abi, signer);
    if (account) {
      if (values.file) {
        console.log(values);
        let cid = await ipfs.add(values.file);
        const uri = `https://ipfs.infura.io/ipfs/${cid.path}`;
        values = { ...values, uri };
        cid = await ipfs.add(JSON.stringify(values));
        const tokenUri = `https://ipfs.infura.io/ipfs/${cid.path}`;
        console.log(tokenUri, 'tokenUri');
        let nftTxn = await contract.mintCryptoPicture(uri, values.author, values.createAt, tokenUri, {
          value: contractInfo.mintPrice,
        });
        await nftTxn.wait();
        navigate("/");
      }
    }
  };

  return (
    <PictureForm handleBack={onBack} handleSubmit={onSubmit} />
  );
};

export default PictureMint;
