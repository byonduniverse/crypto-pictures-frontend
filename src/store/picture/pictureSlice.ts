import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../index';
import type { Picture, PictureDetail } from "../../constants/types";
// Define a type for the slice state
interface PictureState {
  cryptoPictures: Picture[];
  pictureDetail: PictureDetail;
}

// Define the initial state using that type
const initialState: PictureState = {
  cryptoPictures: [],
  pictureDetail: {}
};

export const pictureSlice = createSlice({
  name: 'cryptoPictrue',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPictures: (state: PictureState, action: PayloadAction<Picture[]>) => {
      state.cryptoPictures = action.payload;
    },
    setPictureDetail: (state: PictureState, action: PayloadAction<PictureDetail>) => {
      state.pictureDetail = action.payload;
    }
  }
});

export const { setPictures, setPictureDetail } = pictureSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPictures = (state: RootState) => state.picture.cryptoPictures;
export const selectPictureDetail = (state: RootState) => state.picture.pictureDetail;

export default pictureSlice.reducer;