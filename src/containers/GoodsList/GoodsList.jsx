import React from 'react';
import { useSelector } from 'react-redux';
import { selectGoods } from '../../store/goodsSlice';
import Goods from '../../components/Goods/Goods';
import './GoodsList.css';

const GoodsList = () => {
  const goods = useSelector(selectGoods);

  return (
    <div className="goods-wrapper">
      <div className="goods-field">
        {goods.map((item) => (
          <Goods data={item} key={item.articul} />
        ))}
      </div>
    </div>
  );
};

export default GoodsList;
