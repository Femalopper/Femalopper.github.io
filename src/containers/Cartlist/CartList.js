import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGoods } from '../../store/goodsSlice';
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
} from '../../store/cartSlice';
import Cart from '../../components/Cart/Cart';
import './CartList.css';
import '../../components/Cart/Cart.css';
import Swal from 'sweetalert2';

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
    console.log(currentId);
    console.log(value);
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

  const getCartData = () => {
    const cartData = {
      items: [],
      totalQuantity: counter,
      totalSum: 0,
    };
    cartData.items = Object.keys(cart).map((key) => ({ item: goodsObj[key], quantity: cart[key] }));
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
    <div className={`${visibility} cart-container`} id="cart">
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
              <th>Цена / ₽</th>
              <th>Общая цена / ₽</th>
              <th>Кол-во</th>
              <th className="delete delete-all">
                <span className="delete delete-all-span">Очистить корзину</span>
              </th>
            </tr>
            {Object.keys(cart).map((key) => (
              <Cart key={goodsObj[key]} dataArticul={goodsObj[key]} quantity={cart[key]} />
            ))}
          </tbody>
        </table>
        <div className={`${emptyVisibility} cart-empty`}>Корзина пуста!</div>
        <div className="total-result">
          <p>
            <b>Общая стоимость:</b>
          </p>
          <p className="total-sum-number">
            {getCartData().totalSum}
            {' ₽'}
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
                onFocus={checkEmptyField}
                className="make-order-field"
                placeholder="Введите имя"
                name="userName"
              ></input>
            </div>
            <div>
              <input
                id="tel"
                type="tel"
                onInput={checkValidity}
                onFocus={checkEmptyField}
                className="make-order-field"
                placeholder="Введите телефон"
                name="userTel"
                maxLength="16"
              ></input>
            </div>
            <div>
              <input
                id="mail"
                type="text"
                onInput={checkValidity}
                onFocus={checkEmptyField}
                className="make-order-field"
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
            <button onClick={sendOrder} id="submit">
              Сделать заказ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CartList;
