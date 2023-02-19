import { createSlice } from '@reduxjs/toolkit';
import goodsArr from '../data/goods.json';

export const goodsSlice = createSlice({
  name: 'goods',
  initialState: {
    goods: goodsArr,
    goodsVisibility: '',
  },
  reducers: {
    goodsSwitcherVisibility: (state) => {
      if (state.goodsVisibility === '') {
        state.goodsVisibility = 'hide';
      } else {
        state.goodsVisibility = '';
      }
    },
  },
});

export const { goodsSwitcherVisibility } = goodsSlice.actions;
export const selectGoods = (state) => state.goods.goods;
export const selectGoodsVisibility = (state) => state.goods.goodsVisibility;

export default goodsSlice.reducer;
