import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: {},
    counter: 0,
    showCart: '',
    hideCart: 'hide',
  },
  reducers: {
    increment: (state, data) => {
      const articul = data.payload;
      if (state.value[articul] === undefined) state.value[articul] = 0;
      state.value[articul]++;
      state.counter++;
    },
    decrement: (state, data) => {
      const articul = data.payload;
      if (state.value[articul] < 2) {
        state.counter--;
        delete state.value[articul];
      } else {
        state.value[articul]--;
        state.counter++;
      }
    },
    deleteItem: (state, data) => {
      const articul = data.payload;
      state.counter = state.counter - state.value[articul];
      delete state.value[articul];
    },
    deleteAll: (state) => {
      state.value = {};
      state.counter = 0;
    },
    cartSwitcherVisibility: (state, elemById) => {
      console.log(elemById);
      if (state.showCart === '') {
        state.showCart = 'hide';
        state.hideCart = '';
      } else {
        state.showCart = '';
        state.hideCart = 'hide';
      }
    },
  },
});

export const { increment, decrement, deleteItem, deleteAll, cartSwitcherVisibility } = cartSlice.actions;
export const selectCart = (state) => state.cart.value;
export const selectCounter = (state) => state.cart.counter;
export const selectShowCart = (state) => state.cart.showCart;
export const selectHideCart = (state) => state.cart.hideCart;

export default cartSlice.reducer;
