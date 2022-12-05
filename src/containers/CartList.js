import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGoods } from '../store/goodsSlice';
import { selectCart } from '../store/cartSlice';
import { decrement, deleteItem, increment, deleteAll } from '../store/cartSlice';
import Cart from '../components/Cart';

const CartList = () => {
  const goods = useSelector(selectGoods);
  const cart = useSelector(selectCart);
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

  console.log(goodsObj);
  console.log(cart);
  return (
    <>
      <div>
        <button>x</button>
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
    </>
  );
};

export default CartList;
