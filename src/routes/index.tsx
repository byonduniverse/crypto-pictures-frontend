import { BrowserRouter, Route, Routes } from "react-router-dom";

import CryptoPictureList from "../pages/CryptoPictures/list";
import CryptoPictureDetail from "../pages/CryptoPictures/detail";
import PictureMint from "../pages/CryptoPictures/add";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CryptoPictureList />} />
        <Route path="/pictures/:id" element={<CryptoPictureDetail />} />
        <Route path="/pictures/mint" element={<PictureMint />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;