import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGoods } from '../store/goodsSlice';
import Goods from '../components/Goods';
import { increment } from '../store/cartSlice';
import Swal from 'sweetalert2';

const GoodsList = () => {
  const goods = useSelector(selectGoods);

  const dispatch = useDispatch();

  const clickHandler = (event) => {
    event.preventDefault();
    const t = event.target;
    const currentQuantity = document.getElementById(t.getAttribute('data-key'));

    if (t.classList.contains('plus-quantity')) {
      const addValue = +currentQuantity.value + 1;
      currentQuantity.value = addValue;
    } else if (t.classList.contains('minus-quantity')) {
      const reduceValue = +currentQuantity.value - 1;
      if (reduceValue > 0) {
        currentQuantity.value = reduceValue;
      }
    } else if (t.classList.contains('add-to-cart')) {
      const data = [t.getAttribute('data-key'), currentQuantity.value];
      dispatch(increment(data));
      currentQuantity.value = 1;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Товар добавлен в корзину!',
        showConfirmButton: false,
        timer: 1500,
        width: 300,
      });
    }
  };

  const inputIsValid = (event) => {
    const code = event.keyCode;
    if ((code <= 194 && code >= 187) || (event.target.value.length > 1 && code !== 8)) {
      event.preventDefault();
    }
  };

  const inputIsEmpty = (event) => {
    if (event.target.value === '') {
      event.target.value = 1;
    }
  };

  return (
    <div>
      <div className="goods-field" onClick={clickHandler}>
        {goods.map((item) => (
          <Goods data={item} key={item.articul} isValid={inputIsValid} isEmpty={inputIsEmpty} />
        ))}
      </div>
    </div>
  );
};

export default GoodsList;
