import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCounter,
  cartStateSwitcher,
} from '../../store/cartSlice';
import './Header.css';
import { goodsStateSwitcher, selectGoodsState} from '../../store/goodsSlice';
import cart from '../../img/cart.png';
import classNames from 'classnames';

const Header = (props) => {
  const catries = props.data.nav;
  const cat = catries.map((item, index) => (
    <li key={index}>
      <NavLink to={item.link}>{item.text}</NavLink>
    </li>
  ));

  const goodsState = useSelector(selectGoodsState);
  const cartCounter = useSelector(selectCounter);
  const dispatch = useDispatch();

  const openCart = (event) => {
    event.preventDefault();
    dispatch(goodsStateSwitcher("closed"));
    dispatch(cartStateSwitcher("openning"));
    setTimeout(() => {
      dispatch(cartStateSwitcher("opened"));
    });
  };

  return (
    <div className={classNames({ "hide": goodsState === "closed"})} id="goods">
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
