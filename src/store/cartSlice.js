import { createSlice, current } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartGoods: {},
    counter: 0,
    totalSum: 0,
    cartProcess: {
      cartState: 'closed',
    },
    consumerData: {},
  },
  reducers: {
    increment: (state, data) => {
      const articul = data.payload[0];
      const currentQuantity = +data.payload[1];
      if (state.cartGoods[articul] === undefined) state.cartGoods[articul] = 0;
      state.cartGoods[articul] += currentQuantity;
      state.counter += currentQuantity;
      console.log(current);
    },
    decrement: (state, data) => {
      const articul = data.payload;
      if (state.cartGoods[articul] < 2) {
        state.counter -= 1;
        delete state.cartGoods[articul];
      } else {
        state.cartGoods[articul] -= 1;
        state.counter -= 1;
      }
    },
    deleteItem: (state, data) => {
      const articul = data.payload;
      state.counter = state.counter - state.cartGoods[articul];
      delete state.cartGoods[articul];
    },
    deleteAll: (state) => {
      state.cartGoods = {};
      state.counter = 0;
    },
    cartStateSwitcher: (state, data) => {
      const process = data.payload;
      state.cartProcess.cartState = process;
    },
  },
});

export const { increment, decrement, deleteItem, deleteAll, cartStateSwitcher } =
  cartSlice.actions;
export const selectCart = (state) => state.cart.cartGoods;
export const selectCounter = (state) => state.cart.counter;
export const selectCartState = (state) => state.cart.cartProcess.cartState;

export default cartSlice.reducer;
