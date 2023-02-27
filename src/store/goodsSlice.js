import { createSlice } from '@reduxjs/toolkit';
import goodsArr from '../data/goods.json';

export const goodsSlice = createSlice({
  name: 'goods',
  initialState: {
    goods: goodsArr,
    goodsProcess: {
      goodsState: 'opened',
    },
  },
  reducers: {
    goodsStateSwitcher: (state, data) => {
      const process = data.payload;
      state.goodsProcess.goodsState = process;
    },
    changeGoodsQuantity: (state, data) => {
      const { currentId, value } = data.payload;
      state.goods[currentId].quantity = value;
    },
  },
});

export const { goodsStateSwitcher, changeGoodsQuantity, setCurrent } = goodsSlice.actions;
export const selectGoods = (state) => state.goods.goods;
export const selectGoodsState = (state) => state.goods.goodsProcess.goodsState;

export default goodsSlice.reducer;
