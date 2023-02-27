import React from 'react';
import { useSelector } from 'react-redux';
import { selectSubmitBtnVisibility, selectConsumerData } from '../../../store/cartSlice';

const CartForm = (props) => {
    const submitButton = useSelector(selectSubmitBtnVisibility);
    const orderForm = useSelector(selectConsumerData);

    return (
        <>
        <form id="cart-data">
        <div className="make-order">
          <div>
            <input
              id="name"
              type="text"
              onInput={props.isValid}
              className={`make-order-field ${orderForm.name.errorClass}`}
              placeholder="Введите имя"
              name="userName"
            ></input>
          </div>
          <div>
            <input
              id="tel"
              type="tel"
              onInput={props.isValid}
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
              onInput={props.isValid}
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
          <button onClick={props.close}>Продолжить покупки</button>
          <button onClick={props.send} id="submit" disabled={submitButton}>
            Сделать заказ
          </button>
        </div>
      </form>
      </>
    )
};

export default CartForm;