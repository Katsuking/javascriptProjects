import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import postReducer from './features/post/postSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    post: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // useSelectorで使う
export type AppDispatch = typeof store.dispatch;
