import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSubmitBtnVisibility,
  selectConsumerData,
  setConsumerData,
  selectCart,
  cartStateSwitcher,
} from '../../../store/cartSlice';
import { goodsStateSwitcher } from '../../../store/goodsSlice';
import Swal from 'sweetalert2';
import classNames from 'classnames';
import './CartForm.css';

const CartForm = React.forwardRef((props, ref) => {
  const submitButton = useSelector(selectSubmitBtnVisibility);
  const orderForm = useSelector(selectConsumerData);
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const formRef = React.createRef();

  const validateEmail = (email) => {
    const re = /^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,4}$/i;
    return re.test(String(email).toLowerCase());
  };

  const phoneNumber = (number) => {
    const re = /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
    return re.test(number);
  };

  const checkValidity = (event) => {
    event.preventDefault();
    const value = event.target.value;
    const currentId = event.target.name;
    const validity =
      currentId === 'name'
        ? value.length >= 2
        : currentId === 'tel'
        ? phoneNumber(value)
        : validateEmail(value);
    dispatch(setConsumerData({ validity, currentId }));
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

    fetch('#', {
      method: 'POST',
      body: { productsData: cart, userData: [...new FormData(formRef.current)] },
    });

    ref.current.style.pointerEvents = 'none';
    setTimeout(() => {
      dispatch(props.deleteAll());
      dispatch(cartStateSwitcher('sent order'));
      ref.current.style.pointerEvents = 'auto';
      dispatch(goodsStateSwitcher('opened'));
    }, 1500);
  };

  return (
    <>
      <form id="cart-data" onSubmit={sendOrder} ref={formRef}>
        <div className="make-order">
          {Object.keys(orderForm).map((key) => (
            <div key={key}>
              <input
                type={key === 'tel' ? 'tel' : 'text'}
                onInput={checkValidity}
                className={classNames('make-order-field', { incorrect: orderForm[key].validity })}
                name={key}
                placeholder={
                  key === 'tel'
                    ? 'Введите телефон +7(✗✗✗)✗✗✗-✗✗-✗✗'
                    : key === 'name'
                    ? 'Введите имя'
                    : 'Введите e-mail'
                }
                maxLength={key === 'tel' ? '16' : ''}
              />
            </div>
          ))}
          <div>
            <a href="#">
              <input id="payment" className="payment" value="Оплатить" readOnly />
            </a>
          </div>
        </div>
        <div className="form-buttons">
          <button onClick={props.close}>Продолжить покупки</button>
          <button id="submit" disabled={submitButton}>
            Сделать заказ
          </button>
        </div>
      </form>
    </>
  );
});

CartForm.displayName = 'CartForm';
export default CartForm;
