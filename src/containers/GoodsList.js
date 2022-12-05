import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGoods } from '../store/goodsSlice';
import Goods from '../components/Goods';
import { increment } from '../store/cartSlice';

const GoodsList = () => {
  const goods = useSelector(selectGoods);
  const dispatch = useDispatch();

  const clickHandler = (event) => {
    event.preventDefault();
    const t = event.target;
    if (!t.classList.contains('add-to-cart')) return true;
    dispatch(increment(t.getAttribute('data-key')));
  };

  return (
    <>
      <div>
        <></>
      </div>
      <div className="goods-field" onClick={clickHandler}>
        {goods.map((item) => (
          <Goods data={item} key={item.articul} />
        ))}
      </div>
    </>
  );
};

export default GoodsList;
