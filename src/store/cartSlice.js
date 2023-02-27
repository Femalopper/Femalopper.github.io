import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartGoods: {},
    counter: 0,
    cartProcess: {
      cartState: 'closed',
    },
    submitBtnVisibility: true,
    consumerData: {
      name: { validity: false, errorClass: '' },
      tel: { validity: false, errorClass: '' },
      mail: { validity: false, errorClass: '' },
    },
  },
  reducers: {
    increment: (state, data) => {
      const articul = data.payload[0];
      const currentQuantity = +data.payload[1];
      if (state.cartGoods[articul] === undefined) state.cartGoods[articul] = 0;
      state.cartGoods[articul] += currentQuantity;
      state.counter += currentQuantity;
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
    submitBtnSwitcher: (state, data) => {
      state.submitBtnVisibility = data.payload;
    },
    setConsumerData: (state, data) => {
      const obj = data.payload;
      const currentField = obj.currentId;
      state.consumerData[currentField].errorClass = obj.validity ? '' : 'incorrect';
      state.consumerData[currentField].validity = obj.validity;
    },
  },
});

export const {
  increment,
  decrement,
  deleteItem,
  deleteAll,
  cartStateSwitcher,
  submitBtnSwitcher,
  setConsumerData,
} = cartSlice.actions;
export const selectCart = (state) => state.cart.cartGoods;
export const selectCounter = (state) => state.cart.counter;
export const selectCartState = (state) => state.cart.cartProcess.cartState;
export const selectConsumerData = (state) => state.cart.consumerData;
export const selectSubmitBtnVisibility = (state) => state.cart.submitBtnVisibility;

export default cartSlice.reducer;
