import { createSlice } from '@reduxjs/toolkit';
import cartItems, { cartItemsProps } from '../../../cartItems';

export type CartState = {
  cartItems: cartItemsProps[];
  amount: number;
  total: number;
  isLoading: boolean;
};

const initialState: CartState = {
  cartItems: cartItems, // 今回はハードコードされたデフォルト値を用意
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      console.log('removeItem reducer -> action:', action);
      state.cartItems = state.cartItems.filter(
        // これstate.cartItems にせずにcartItemsでやったら大事やで
        (item) => item.id !== action.payload,
      );
    },
    increment: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      if (cartItem && cartItem.amount !== undefined) {
        cartItem.amount += 1;
      }
    },
    calculateTotal: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * parseInt(item.price);
      });
      state.amount = amount;
      state.total = total;
    },
  },
});

export const { clearCart, removeItem, increment, calculateTotal } =
  cartSlice.actions;

// console.log('carSlice createSliceの中身:', cartSlice);
export default cartSlice.reducer;
