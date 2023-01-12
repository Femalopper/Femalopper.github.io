import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGoods } from '../store/goodsSlice';
import { decrement, deleteItem, increment, deleteAll, selectCart, selectHideCart, cartSwitcherVisibility } from '../store/cartSlice';
import Cart from '../components/Cart';
import '../components/Cart.css';

const CartList = () => {
  const goods = useSelector(selectGoods);
  const cart = useSelector(selectCart);
  const visibility = useSelector(selectHideCart);
  const dispatch = useDispatch();

  const goodsObj = goods.reduce((acc, item) => {
    acc[item['articul']] = item;
    return acc;
  }, {});

  const cartHandler = (event) => {
    event.preventDefault();
    const t = event.target;
    if (t.classList.contains('minus')) {
      dispatch(decrement(t.getAttribute('data-key')));
    } else if (t.classList.contains('plus')) {
      dispatch(increment([t.getAttribute('data-key'), 1]));
    } else if (t.classList.contains('delete-all')) {
      dispatch(deleteAll());
    } else if (t.classList.contains('delete-item')) {
      dispatch(deleteItem(t.getAttribute('data-key')));
    }
  };

  const closeCart = (event) => {
    event.preventDefault();
    dispatch(cartSwitcherVisibility());
  };

  return (
    <div className={`${visibility} cart-container`} id="cart">
      <div className="cart">
        <div className="close-cart">
          <button onClick={closeCart}>x</button>
        </div>
        <table onClick={cartHandler}>
          <tbody>
            <tr>
              <th></th>
              <th>Название товара</th>
              <th>Цена</th>
              <th>Кол-во</th>
              <th>Общая стоимость</th>
              <th>Уменьшить</th>
              <th>Увеличить</th>
              <th className="delete-all">Очистить корзину</th>
            </tr>
            {Object.keys(cart).map((key) => (
              <Cart dataArticul={goodsObj[key]} quantity={cart[key]} />
            ))}
            <tr>
              <td>
                <b>Общая сумма</b>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <b>
                  {Object.keys(cart).reduce((acc, key) => {
                    return (acc += +goodsObj[key]['cost'].slice(0, -5) * cart[key]);
                  }, 0)}
                </b>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="make-order">
          <button>Сделать заказ</button>
        </div>
      </div>
    </div>
  );
};

export default CartList;
