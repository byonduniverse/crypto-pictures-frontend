import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

// Define a type for the slice state
interface ContractState {
  account: string;
}

// Define the initial state using that type
const initialState: ContractState = {
  account: ""
};

export const contractSlice = createSlice({
  name: 'contract',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAccount: (state: ContractState, action: PayloadAction<string>) => {
      state.account = action.payload;
    }
  },
});

export const { setAccount } = contractSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAccount = (state: RootState) => state.contract.account;

export default contractSlice.reducer;