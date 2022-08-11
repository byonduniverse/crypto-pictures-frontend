import { configureStore } from '@reduxjs/toolkit';
import contractSlice from './contract/contractSlice';
import pictureSlice from './picture/pictureSlice';

export const store = configureStore({
  reducer: {
    contract: contractSlice,
    picture: pictureSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;