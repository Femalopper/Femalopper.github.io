import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { goodsSwitcherVisibility, selectGoods } from '../../store/goodsSlice';
import {
  decrement,
  deleteItem,
  increment,
  deleteAll,
  selectCart,
  cartSwitcherVisibility,
  selectEmptyCart,
  cartIsEmpty,
  selectCounter,
  selectCartVisibility,
} from '../../store/cartSlice';
import Cart from '../../components/Cart/Cart';
import './CartList.css';
import '../../components/Cart/Cart.css';
import Swal from 'sweetalert2';

const CartList = () => {
  const goods = useSelector(selectGoods);
  const cart = useSelector(selectCart);
  const cartVisibility = useSelector(selectCartVisibility);
  const emptyCartPhrase = useSelector(selectEmptyCart);
  const counter = useSelector(selectCounter);
  const dispatch = useDispatch();
  const [orderForm, setOrderFormValidity] = useState({
    name: { validity: null, errorClass: '' },
    tel: { validity: null, errorClass: '' },
    mail: { validity: null, errorClass: '' },
  });
  const [submitButton, setDisable] = useState(false);

  const activateMakeOrderBtn = () => {
    orderForm.name.validity &&
    orderForm.tel.validity &&
    orderForm.mail.validity &&
    counter !== 0
      ? setDisable(false)
      : setDisable(true);
  };

  useEffect(() => {
    setTimeout(() => {
      const animatedWrapper = document.querySelector('#cart');
      animatedWrapper.classList.add('cart-active');
    });
  });

  useEffect(() => {
    activateMakeOrderBtn();
  }, [counter, orderForm]);

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
    } else if (t.classList.contains('delete') || t.classList.contains('delete')) {
      dispatch(deleteAll());
    } else if (t.classList.contains('delete-item')) {
      dispatch(deleteItem(t.getAttribute('data-key')));
    }
    dispatch(cartIsEmpty());
  };

  const closeCart = (event) => {
    if (event) {
      event.preventDefault();
    }
    const animatedWrapper = document.querySelector('#cart');
    animatedWrapper.classList.add('animate-cart-close');
    setTimeout(() => {
      dispatch(cartSwitcherVisibility());
      dispatch(goodsSwitcherVisibility());
    }, 500);
  };

  const validateEmail = (email) => {
    const re = /^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,4}$/i;
    return re.test(String(email).toLowerCase());
  };

  const phoneNumber = (number) => {
    const re =
      /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
    return re.test(number);
  };

  const checkValidity = (event) => {
    event.preventDefault();
    const value = event.target.value;
    const currentId = event.target.getAttribute('id');
    setOrderFormValidity((orderForm) => {
      let validity;
      const validateName = () => value.length >= 2;
      const validateTel = () => phoneNumber(value);
      const validatePhone = () => validateEmail(value);
      if (currentId === 'name') {
        validity = validateName();
      } else if (currentId === 'tel') {
        validity = validateTel();
      } else if (currentId === 'mail') {
        validity = validatePhone();
      }
      return {
        ...orderForm,
        [currentId]: { validity, errorClass: validity ? '' : 'incorrect' },
      };
    });
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

    const cart = document.querySelector('#cart');
    cart.style.pointerEvents = 'none';
    setTimeout(() => {
      dispatch(deleteAll());
      dispatch(cartIsEmpty());
      closeCart();
      cart.style.pointerEvents = 'auto';
    }, 1500);
  };

  return (
    <div className={`${cartVisibility} cart-container`} id="cart">
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
              <th className="delete delete-all">
                <span className="delete delete-all-span">Очистить корзину</span>
              </th>
            </tr>
            {Object.keys(cart).map((key, index) => (
              <Cart key={index} dataArticul={goodsObj[key]} quantity={cart[key]} />
            ))}
          </tbody>
        </table>
        <div className={`${emptyCartPhrase} cart-empty`}>Корзина пуста!</div>
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
        <form id="cart-data">
          <div className="make-order">
            <div>
              <input
                id="name"
                type="text"
                onInput={checkValidity}
                className={`make-order-field ${orderForm.name.errorClass}`}
                placeholder="Введите имя"
                name="userName"
              ></input>
            </div>
            <div>
              <input
                id="tel"
                type="tel"
                onInput={checkValidity}
                className={`make-order-field ${orderForm.tel.errorClass}`}
                placeholder="Введите телефон +7(✗✗✗)✗✗✗-✗✗-✗✗"
                name="userTel"
                maxLength="16"
              ></input>
            </div>
            <div>
              <input
                id="mail"
                type="text"
                onInput={checkValidity}
                className={`make-order-field ${orderForm.mail.errorClass}`}
                placeholder="Введите e-mail"
                name="userEmail"
              ></input>
            </div>
            <div>
              <a href="#">
                <input id="payment" className="payment" value="Оплатить" readOnly></input>
              </a>
            </div>
          </div>
          <div className="form-buttons">
            <button onClick={closeCart}>Продолжить покупки</button>
            <button onClick={sendOrder} id="submit" disabled={submitButton}>
              Сделать заказ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CartList;
