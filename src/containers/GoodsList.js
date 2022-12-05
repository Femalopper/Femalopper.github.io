import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGoods } from '../store/goodsSlice';
import Goods from '../components/Goods';
import { increment, cartSwitcherVisibility, selectShowCart, selectCart, selectCounter } from '../store/cartSlice';

const GoodsList = () => {
  const goods = useSelector(selectGoods);
  const cartCounter = useSelector(selectCounter);
  console.log(cartCounter);
  const visibility = useSelector(selectShowCart);
  const dispatch = useDispatch();

  const clickHandler = (event) => {
    event.preventDefault();
    const t = event.target;
    if (!t.classList.contains('add-to-cart')) return true;
    dispatch(increment(t.getAttribute('data-key')));
  };

  const openCart = (event) => {
    event.preventDefault();
    dispatch(cartSwitcherVisibility());
  };

  return (
    <div className={visibility} id="goods">
      <div>
        <img src={require('../img/cart.png')} className="mini-cart" alt="mini-cart-img" width="30" height="30" onClick={openCart}></img>
        <span class="circle">{cartCounter}</span>
      </div>
      <div className="goods-field" onClick={clickHandler}>
        {goods.map((item) => (
          <Goods data={item} key={item.articul} />
        ))}
      </div>
    </div>
  );
};

export default GoodsList;
