import React from 'react';
import './Goods.css';
import require from 'requirejs';
import { useDispatch, useSelector } from 'react-redux';
import { selectGoods, changeGoodsQuantity } from '../../store/goodsSlice';
import { increment } from '../../store/cartSlice';
import Swal from 'sweetalert2';

const Goods = (props) => {
  const goodQuantity = React.createRef();
  const goods = useSelector(selectGoods);
  const dispatch = useDispatch();
  const { image, cost, title, currency, quantity, articul } = props.data;

  const changeHandler = (event) => {
    event.preventDefault();
    const { id, value } = goodQuantity.current;
    const currentId = goods.findIndex(({ articul }) => articul === id);
    dispatch(changeGoodsQuantity({ currentId, value }));
  };

  const handler = (t) => {
    const currentId = goods.findIndex(({ articul }) => articul === t.dataset.key);
    const value = +goods[currentId].quantity;
    return { currentId, value };
  };

  const plusHandler = (event) => {
    const { currentId, value } = handler(event.target);
    dispatch(changeGoodsQuantity({ currentId, value: value + 1 }));
  };

  const minusHandler = (event) => {
    const { currentId, value } = handler(event.target);
    if (value > 1) {
      dispatch(changeGoodsQuantity({ currentId, value: value - 1 }));
    }
  };

  const goodsObj = goods.reduce((acc, item) => {
    acc[item['articul']] = item;
    return acc;
  }, {});

  const addToCartHandler = (event) => {
    const { currentId, value } = handler(event.target);

    if (value !== 0) {
      const data = [goodsObj[event.target.dataset.key], value];
      dispatch(increment(data));
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Товар добавлен в корзину!',
        showConfirmButton: false,
        timer: 1500,
        width: 300,
      });
    } else {
      goodQuantity.current.setAttribute('style', 'border: 1px solid red');
      setTimeout(() => {
        goodQuantity.current.removeAttribute('style');
        dispatch(changeGoodsQuantity({ currentId, value: 1 }));
      }, 1000);
    }
  };

  const inputIsValid = (event) => {
    const code = event.keyCode;
    if (code === 8 || code === 37 || code === 39) {
      return;
    }
    if (code < 48 || (code > 57 && code < 96) || code > 105) {
      event.preventDefault();
    }
  };

  const inputIsEmpty = (event) => {
    if (event.target.value === '') {
      event.target.value = 1;
    }
  };

  return (
    <div className="goods-block">
      <img src={require(`../../img/${image}`)} alt="" />
      <p className="good-title">{title}</p>
      <p className="price">
        {cost}
        {currency}
      </p>
      <div className="change-quantity">
        <button className="minus-quantity" data-key={articul} onClick={minusHandler}>
          -
        </button>
        <input
          id={articul}
          type="text"
          onKeyDown={inputIsValid}
          onBlur={inputIsEmpty}
          maxLength="2"
          ref={goodQuantity}
          onChange={changeHandler}
          value={quantity}
        ></input>
        <button className="plus-quantity" data-key={articul} onClick={plusHandler}>
          +
        </button>
      </div>
      <button className="add-to-cart" data-key={articul} onClick={addToCartHandler}>
        Добавить в корзину
      </button>
    </div>
  );
};

export default Goods;
