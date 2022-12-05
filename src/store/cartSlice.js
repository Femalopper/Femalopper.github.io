import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: {},
  },
  reducers: {
    increment: (state, data) => {
      const articul = data.payload;
      if (state.value[articul] === undefined) state.value[articul] = 0;
      state.value[articul]++;
    },
    decrement: (state, data) => {
      const articul = data.payload;
      if (state.value[articul] < 2) delete state.value[articul];
      else state.value[articul]--;
    },
    deleteItem: (state, data) => {
      const articul = data.payload;
      delete state.value[articul];
    },
    deleteAll: (state) => {
      state.value = {};
    },
  },
});

export const { increment, decrement, deleteItem, deleteAll } = cartSlice.actions;
export const selectCart = (state) => state.cart.value;

export default cartSlice.reducer;
