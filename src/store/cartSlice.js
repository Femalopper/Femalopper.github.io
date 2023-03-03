import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartGoods: {},
    cartProcess: {
      cartState: 'closed',
    },
    totalSum: 0,
    totalQuantity: 0,
    submitBtnVisibility: true,
    consumerData: {
      name: { validity: '', value: '' },
      tel: { validity: '', value: '' },
      mail: { validity: '', value: '' },
    },
  },
  reducers: {
    increment: (state, data) => {
      const articul = data.payload[0].articul;
      const currentQuantity = +data.payload[1];
      if (state.cartGoods[articul] === undefined) {
        state.cartGoods[articul] = { ...data.payload[0] };
        state.cartGoods[articul].quantity = 0;
      }
      state.totalSum += +data.payload[0].quantity * +data.payload[0].cost;
      state.cartGoods[articul].quantity += currentQuantity;
      state.totalQuantity += currentQuantity;
    },
    decrement: (state, data) => {
      const articul = data.payload;
      state.totalSum -= state.cartGoods[articul].cost;
      if (state.cartGoods[articul].quantity < 2) {
        state.totalQuantity -= 1;
        delete state.cartGoods[articul];
      } else {
        state.cartGoods[articul].quantity -= 1;
        state.totalQuantity -= 1;
      }
    },
    deleteItem: (state, data) => {
      const articul = data.payload;
      state.totalQuantity = state.totalQuantity - state.cartGoods[articul].quantity;
      state.totalSum -= +state.cartGoods[articul].cost * state.cartGoods[articul].quantity;
      delete state.cartGoods[articul];
    },
    deleteAll: (state) => {
      state.cartGoods = {};
      state.totalQuantity = 0;
      state.totalSum = 0;
    },
    cartStateSwitcher: (state, data) => {
      const process = data.payload;
      state.cartProcess.cartState = process;
    },
    submitBtnSwitcher: (state, data) => {
      state.submitBtnVisibility = data.payload;
    },
    setConsumerData: (state, data) => {
      const { validity, currentId, value } = data.payload;
      state.consumerData[currentId].validity = validity;
      state.consumerData[currentId].value = value;
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
export const selectQuantity = (state) => state.cart.totalQuantity;
export const selectCartState = (state) => state.cart.cartProcess.cartState;
export const selectConsumerData = (state) => state.cart.consumerData;
export const selectTotalSum = (state) => state.cart.totalSum;
export const selectSubmitBtnVisibility = (state) => state.cart.submitBtnVisibility;

export default cartSlice.reducer;
