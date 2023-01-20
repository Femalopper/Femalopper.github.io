import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGoods } from '../store/goodsSlice';
import {
  decrement,
  deleteItem,
  increment,
  deleteAll,
  selectCart,
  selectHideCart,
  cartSwitcherVisibility,
  selectEmptyCart,
  cartIsEmpty,
  selectCounter,
} from '../store/cartSlice';
import Cart from '../components/Cart';
import '../components/Cart.css';

const CartList = () => {
  const goods = useSelector(selectGoods);
  const cart = useSelector(selectCart);
  const visibility = useSelector(selectHideCart);
  const emptyVisibility = useSelector(selectEmptyCart);
  const counter = useSelector(selectCounter);
  const dispatch = useDispatch();

  const activateMakeOrderBtn = () => {
    const name = document.getElementById('name');
    const tel = document.getElementById('tel');
    const mail = document.getElementById('mail');
    const submitButton = document.getElementById('submit');
    if (name.value.length >= 2 && phoneNumber(tel.value) && validateEmail(mail.value) && counter !== 0) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const animatedWrapper = document.querySelector('#cart');
      animatedWrapper.classList.add('cart-active');
    });
  });

  useEffect(() => {
    activateMakeOrderBtn();
  }, [counter]);

  const goodsObj = goods.reduce((acc, item) => {
    acc[item['articul']] = item;
    return acc;
  }, {});

  const cartHandler = (event) => {
    event.preventDefault();
    const t = event.target;
    if (t.classList.contains('minus')) {
      dispatch(decrement(t.getAttribute('data-key')));
      dispatch(cartIsEmpty());
    } else if (t.classList.contains('plus')) {
      dispatch(increment([t.getAttribute('data-key'), 1]));
    } else if (t.classList.contains('delete-all')) {
      dispatch(deleteAll());
      dispatch(cartIsEmpty());
    } else if (t.classList.contains('delete-item')) {
      dispatch(deleteItem(t.getAttribute('data-key')));
      dispatch(cartIsEmpty());
    }
  };

  const closeCart = (event) => {
    event.preventDefault();
    const animatedWrapper = document.querySelector('#cart');
    animatedWrapper.classList.add('animate-cart-close');
    setTimeout(() => {
      dispatch(cartSwitcherVisibility());
    }, 500);
  };

  const validateEmail = (email) => {
    let re = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
    return re.test(String(email).toLowerCase());
  };

  const phoneNumber = (number) => {
    let re = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return re.test(number);
  };

  const checkEmptyField = (event) => {
    const value = event.target.value;
    event.preventDefault();
    if (!value) {
      event.target.classList.remove('make-order-field:focus');
      event.target.classList.add('incorrect');
    }
  };

  const checkValidity = (event) => {
    event.preventDefault();
    const value = event.target.value;
    const currentId = event.target.getAttribute('id');
    if (
      (currentId === 'name' && value.length < 2) ||
      (currentId === 'tel' && !phoneNumber(value)) ||
      (currentId === 'mail' && !validateEmail(value))
    ) {
      event.target.classList.remove('make-order-field:focus');
      event.target.classList.add('incorrect');
    } else {
      event.target.classList.remove('incorrect');
      event.target.classList.add('make-order-field:focus');
    }
    activateMakeOrderBtn();
  };

  return (
    <div className={`${visibility} cart-container`} id="cart">
      <div className="cart">
        <table onClick={cartHandler}>
          <tbody>
            <tr>
              <th className="good">Товар</th>
              <th>Цена / ₽</th>
              <th>Общая цена / ₽</th>
              <th>Кол-во</th>
              <th className="delete-all">
                <span className="delete-all-span">Очистить корзину</span>
              </th>
            </tr>
            {Object.keys(cart).map((key) => (
              <Cart dataArticul={goodsObj[key]} quantity={cart[key]} />
            ))}
          </tbody>
        </table>
        <div className={`${emptyVisibility} cart-empty`}>Корзина пуста!</div>
        <div className="total-result">
          <p>
            <b>Общая стоимость:</b>
          </p>
          <p className="total-sum-number">
            {Object.keys(cart).reduce((acc, key) => {
              return (acc += +goodsObj[key]['cost'] * cart[key]);
            }, 0)}
            {' ₽'}
          </p>
          <p className="total-quantity">
            <b>Всего товаров:</b>
          </p>
          <p className="total-sum-number">
            {Object.keys(cart).reduce((acc, key) => {
              return (acc += cart[key]);
            }, 0)}
          </p>
        </div>
        <form>
          <div className="make-order">
            <div>
              <input
                id="name"
                type="text"
                onKeyUp={checkValidity}
                onFocus={checkEmptyField}
                className="make-order-field"
                placeholder="Введите имя"
                name="userName"
                required
              ></input>
            </div>
            <div>
              <input
                id="tel"
                type="tel"
                onKeyUp={checkValidity}
                onFocus={checkEmptyField}
                className="make-order-field"
                placeholder="Введите телефон"
                name="userTel"
                required
                maxLength="16"
              ></input>
            </div>
            <div>
              <input
                id="mail"
                type="text"
                onKeyUp={checkValidity}
                onFocus={checkEmptyField}
                className="make-order-field"
                placeholder="Введите e-mail"
                name="userEmail"
              ></input>
            </div>
            <div>
              <a href="#">
                <input className="payment" value="Оплатить" readOnly></input>
              </a>
            </div>
          </div>
          <div className="form-buttons">
            <button onClick={closeCart}>Продолжить покупки</button>
            <button id="submit" type="submit" disabled>
              Сделать заказ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CartList;
