import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGoods } from '../store/goodsSlice';
import { decrement, deleteItem, increment, deleteAll, selectCart, selectHideCart, cartSwitcherVisibility } from '../store/cartSlice';
import Cart from '../components/Cart';

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
      dispatch(increment(t.getAttribute('data-key')));
    } else if (t.classList.contains('deleteAll')) {
      dispatch(deleteAll());
    } else if (t.classList.contains('deleteItem')) {
      dispatch(deleteItem(t.getAttribute('data-key')));
    }
  };

  const closeCart = (event) => {
    event.preventDefault();
    dispatch(cartSwitcherVisibility());
  };

  return (
    <div className={visibility} id="cart">
      <div>
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
            <th className="deleteAll">Очистить корзину</th>
          </tr>
          {Object.keys(cart).map((key) => (
            <Cart dataArticul={goodsObj[key]} quantity={cart[key]} />
          ))}
          <tr>
            <td>
              <b>Общая сумма</b>
            </td>
            <td colSpan={6}>
              <b>
                {Object.keys(cart).reduce((acc, key) => {
                  return (acc += goodsObj[key]['cost'] * cart[key]);
                }, 0)}
              </b>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button>Сделать заказ</button>
      </div>
    </div>
  );
};

export default CartList;
