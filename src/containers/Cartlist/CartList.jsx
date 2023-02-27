import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { goodsStateSwitcher, selectGoods } from '../../store/goodsSlice';
import {
  decrement,
  deleteItem,
  increment,
  deleteAll,
  selectCart,
  cartStateSwitcher,
  selectCounter,
  selectCartState,
  submitBtnSwitcher,
} from '../../store/cartSlice';
import Cart from '../../components/Cart/Cart';
import './CartList.css';
import '../../components/Cart/Cart.css';
import Swal from 'sweetalert2';
import classNames from 'classnames';
import CartForm from './CartForm/CartForm';
import { selectConsumerData } from '../../store/cartSlice';

const CartList = () => {
  const goods = useSelector(selectGoods);
  const cart = useSelector(selectCart);
  const cartState = useSelector(selectCartState);
  const counter = useSelector(selectCounter);
  const dispatch = useDispatch();
  const orderForm = useSelector(selectConsumerData);
  const cartRef = React.createRef();

  const activateMakeOrderBtn = () => {
    const { name, tel, mail } = orderForm;
    if (name.validity && tel.validity && mail.validity && counter !== 0) {
      dispatch(submitBtnSwitcher(false));
    } else dispatch(submitBtnSwitcher(true));
  };

  useEffect(() => {
    activateMakeOrderBtn();
  }, [counter, orderForm]);

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
        dispatch(increment([t.dataset.key, 1]));
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
    if (event) {
      event.preventDefault();
    }
    dispatch(cartStateSwitcher('closing'));
    setTimeout(() => {
      dispatch(cartStateSwitcher('closed'));
      dispatch(goodsStateSwitcher('opened'));
    }, 500);
  };

  const getCartData = () => {
    const cartData = {
      items: [],
      totalQuantity: counter,
      totalSum: 0,
    };
    cartData.items = Object.keys(cart).map((key) => ({
      item: goodsObj[key],
      quantity: cart[key],
    }));
    cartData.totalSum = cartData.items.reduce((acc, { item, quantity }) => {
      acc += +item['cost'] * quantity;
      return acc;
    }, 0);
    return cartData;
  };

  const sendOrder = (event) => {
    event.preventDefault();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Заказ оформлен! Ожидайте звонка.',
      showConfirmButton: false,
      timer: 1500,
      width: 300,
    });

    const form = document.getElementById('cart-data');
    const params = new FormData(form);
    fetch('#', {
      method: 'POST',
      body: { productsData: getCartData(), userData: params },
    });

    cartRef.current.style.pointerEvents = 'none';
    setTimeout(() => {
      dispatch(deleteAll());
      closeCart();
      cartRef.current.style.pointerEvents = 'auto';
    }, 1500);
  };

  return (
    <div
      className={classNames(
        {
          hide: cartState === 'closed',
          'cart-active': cartState === 'opened',
          'animate-cart-close': cartState === 'closing',
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
              <Cart key={index} dataArticul={goodsObj[key]} quantity={cart[key]} />
            ))}
          </tbody>
        </table>
        <div className={classNames({ hide: counter !== 0 }, 'cart-empty')}>Корзина пуста!</div>
        <div className="total-result">
          <p>
            <b>Общая стоимость:</b>
          </p>
          <p className="total-sum-number">
            {getCartData().totalSum}
            {goods[0].currency}
          </p>
          <p className="total-quantity">
            <b>Всего товаров:</b>
          </p>
          <p className="total-sum-number">{counter}</p>
        </div>
        <CartForm send={sendOrder} close={closeCart} />
      </div>
    </div>
  );
};

export default CartList;
