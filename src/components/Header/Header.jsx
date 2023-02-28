import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectQuantity, cartStateSwitcher } from '../../store/cartSlice';
import './Header.css';
import { goodsStateSwitcher, selectGoodsState } from '../../store/goodsSlice';
import cart from '../../img/cart.png';
import classNames from 'classnames';

const Header = (props) => {
  const categories = props.data.nav.map((item, index) => (
    <li key={index}>
      <NavLink to={item.link}>{item.text}</NavLink>
    </li>
  ));

  const goodsState = useSelector(selectGoodsState);
  const totalQuantity = useSelector(selectQuantity);
  const dispatch = useDispatch();

  const openCart = (event) => {
    event.preventDefault();
    dispatch(goodsStateSwitcher('closed'));
    dispatch(cartStateSwitcher('openning'));
    setTimeout(() => {
      dispatch(cartStateSwitcher('opened'));
    });
  };

  return (
    <div className={classNames({ hide: goodsState === 'closed' })} id="goods">
      <div className="menu">
        <div className="logo">Shellac Butik</div>
        <nav>
          <ul>{categories}</ul>
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
          <span className="circle">{totalQuantity}</span>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Header;
