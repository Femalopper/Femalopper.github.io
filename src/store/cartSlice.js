import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: {},
    counter: 0,
    cartVisibility: 'hide',
    emptyCartPhrase: 'hide',
  },
  reducers: {
    increment: (state, data) => {
      const articul = data.payload[0];
      const currentQuantity = +data.payload[1];
      if (state.value[articul] === undefined) state.value[articul] = 0;
      state.value[articul] += currentQuantity;
      state.counter += currentQuantity;
    },
    decrement: (state, data) => {
      const articul = data.payload;
      if (state.value[articul] < 2) {
        state.counter--;
        delete state.value[articul];
      } else {
        state.value[articul]--;
        state.counter--;
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
    cartSwitcherVisibility: (state) => {
      if (state.cartVisibility === 'hide') {
        state.cartVisibility = '';
      } else {
        state.cartVisibility = 'hide';
      }
    },
    cartIsEmpty: (state) => {
      if (state.counter === 0) {
        state.emptyCartPhrase = '';
      } else {
        state.emptyCartPhrase = 'hide';
      }
    },
  },
});

export const {
  increment,
  decrement,
  deleteItem,
  deleteAll,
  cartSwitcherVisibility,
  cartIsEmpty,
} = cartSlice.actions;
export const selectCart = (state) => state.cart.value;
export const selectCounter = (state) => state.cart.counter;
export const selectCartVisibility = (state) => state.cart.cartVisibility;
export const selectEmptyCart = (state) => state.cart.emptyCartPhrase;

export default cartSlice.reducer;
