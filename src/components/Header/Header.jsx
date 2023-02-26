import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCounter,
  cartIsEmpty,
  cartSwitcherVisibility,
} from '../../store/cartSlice';
import './Header.css';
import { goodsSwitcherVisibility, selectGoodsVisibility } from '../../store/goodsSlice';
import cart from '../../img/cart.png';

const Header = (props) => {
  const catries = props.data.nav;
  const cat = catries.map((item, index) => (
    <li key={index}>
      <NavLink to={item.link}>{item.text}</NavLink>
    </li>
  ));

  const goodsVisibility = useSelector(selectGoodsVisibility);
  const cartCounter = useSelector(selectCounter);
  const dispatch = useDispatch();

  const openCart = (event) => {
    event.preventDefault();
    dispatch(goodsSwitcherVisibility());
    dispatch(cartSwitcherVisibility());
    dispatch(cartIsEmpty());
  };

  return (
    <div className={goodsVisibility} id="goods">
      <div className="menu">
        <div className="logo">Shellac Butik</div>
        <nav>
          <ul>{cat}</ul>
        </nav>
        <div className="mini-cart-img-span">
          <img
            src={cart}
            className="mini-cart"
            alt="mini-cart-img"
            width="30"
            height="30"
            onClick={openCart}
          ></img>
          <span className="circle">{cartCounter}</span>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Header;
