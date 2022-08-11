import React, { useEffect } from 'react';

import './App.css';
import { useAppDispatch } from './store/hooks';
import { setAccount } from './store/contract/contractSlice';
import Routers from './routes';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const init = async () => {
      const { ethereum } = window;
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      dispatch(setAccount(accounts[0]));
      // // let nftTxn = await cryptoPictures.mintCryptoPicture("https://bafybeicnzpnjxbrw2f6k5yoyxtuvajq7mnpn5ho722agbnudmzcoo7e2cq.ipfs.nftstorage.link/images/2.png", "Rasel", "1983.1.26", "https://bafybeif6dxgkosloui45nylvimtdokpsfrodyt2b347f55zefdukqolzbi.ipfs.nftstorage.link/metadata/2", {
      // //   value: ethers.utils.parseEther("0.0001")
      // // });
      // // await nftTxn.wait();
      // // console.log(`https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
      // let nftTxn = await cryptoPictures.getCryptoPictures(accounts[0]);
      // console.log(nftTxn, 'token');
      // console.log(cryptoPictures.methods);
      // const firstPicture = await cryptoPictures.getCryptoPictureDetail(nftTxn[0]);
      // console.log(firstPicture, 'picture');
      // const tokenuri = await cryptoPictures.tokenURI(nftTxn[0]);
      // console.log(tokenuri, 'tokenuri');
      // const { data: metadata } = await axios.get(tokenuri);
      // console.log(metadata, 'metadata');
    };
    init();
  });

  return (
    <div className="App">
      <Routers />
    </div>
  );
};

export default App;
