import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGoods, goodsStateSwitcher } from '../../store/goodsSlice';
import {
  decrement,
  deleteItem,
  increment,
  deleteAll,
  selectCart,
  selectQuantity,
  selectCartState,
  submitBtnSwitcher,
  selectTotalSum,
  cartStateSwitcher,
} from '../../store/cartSlice';
import Cart from '../../components/Cart/Cart';
import './CartList.css';
import '../../components/Cart/Cart.css';
import classNames from 'classnames';
import CartForm from './CartForm/CartForm';
import { selectConsumerData } from '../../store/cartSlice';

const CartList = () => {
  const goods = useSelector(selectGoods);
  const cart = useSelector(selectCart);
  const cartState = useSelector(selectCartState);
  const totalQuantity = useSelector(selectQuantity);
  const dispatch = useDispatch();
  const orderForm = useSelector(selectConsumerData);
  const cartRef = React.createRef();
  const totalSum = useSelector(selectTotalSum);

  const activateMakeOrderBtn = () => {
    const { name, tel, mail } = orderForm;
    if (name.validity && tel.validity && mail.validity && totalQuantity !== 0) {
      dispatch(submitBtnSwitcher(false));
    } else dispatch(submitBtnSwitcher(true));
  };

  useEffect(() => {
    activateMakeOrderBtn();
  }, [totalQuantity, orderForm]);

  const goodsObj = goods.reduce((acc, item) => {
    acc[item['articul']] = item;
    return acc;
  }, {});

  const cartHandler = (event) => {
    const t = event.target;
    const click = t.dataset.click;

    switch (click) {
      case 'minus':
        dispatch(decrement(t.dataset.key));
        break;
      case 'plus':
        dispatch(increment([goodsObj[t.dataset.key], 1]));
        break;
      case 'delete':
        dispatch(deleteAll());
        break;
      case 'delete-item':
        dispatch(deleteItem(t.dataset.key));
        break;
      default:
        break;
    }
  };

  const closeCart = (event) => {
    event.preventDefault();
    dispatch(cartStateSwitcher('closing'));
    setTimeout(() => {
      dispatch(cartStateSwitcher('closed'));
      dispatch(goodsStateSwitcher('opened'));
    }, 500);
  };

  return (
    <div
      className={classNames(
        {
          hide: cartState === 'closed',
          'cart-active': cartState === 'opened',
          'animate-cart-close': cartState === 'closing' || cartState === 'sent order',
        },
        'cart-container'
      )}
      id="cart"
      ref={cartRef}
    >
      <div className="cart">
        <div className="close-cart-wrapper">
          <button className="close-cart" onClick={closeCart}>
            ×
          </button>
        </div>
        <table onClick={cartHandler}>
          <tbody>
            <tr>
              <th className="good">Товар</th>
              <th>{`Цена / ${goods[0].currency}`}</th>
              <th>{`Общая цена / ${goods[0].currency}`}</th>
              <th>Кол-во</th>
              <th className="delete delete-all" data-click="delete">
                <span className="delete delete-all-span" data-click="delete">
                  Очистить корзину
                </span>
              </th>
            </tr>
            {Object.keys(cart).map((key, index) => (
              <Cart key={index} dataArticul={goodsObj[key]} quantity={cart[key].quantity} />
            ))}
          </tbody>
        </table>
        <div className={classNames({ hide: totalQuantity !== 0 }, 'cart-empty')}>
          Корзина пуста!
        </div>
        <div className="total-result">
          <p>
            <b>Общая стоимость:</b>
          </p>
          <p className="total-sum-number">
            {totalSum}
            {goods[0].currency}
          </p>
          <p className="total-quantity">
            <b>Всего товаров:</b>
          </p>
          <p className="total-sum-number">{totalQuantity}</p>
        </div>
        <CartForm close={closeCart} deleteAll={deleteAll} ref={cartRef} />
      </div>
    </div>
  );
};

export default CartList;
