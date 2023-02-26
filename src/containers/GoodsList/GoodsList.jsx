import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGoods } from '../../store/goodsSlice';
import Goods from '../../components/Goods/Goods';
import './GoodsList.css';
import { increment } from '../../store/cartSlice';
import Swal from 'sweetalert2';

const GoodsList = () => {
  const goods = useSelector(selectGoods);
  const dispatch = useDispatch();

  const clickHandler = (event) => {
    event.preventDefault();
    const t = event.target;
    const currentQuantity = document.getElementById(t.getAttribute('data-key'));
    console.log(currentQuantity);

    if (t.classList.contains('plus-quantity')) {
      const addValue = +currentQuantity.value + 1;
      currentQuantity.value = addValue;
    } else if (t.classList.contains('minus-quantity')) {
      const reduceValue = +currentQuantity.value - 1;
      if (reduceValue > 0) {
        currentQuantity.value = reduceValue;
      }
    } else if (t.classList.contains('add-to-cart') && (currentQuantity.value === '0' || currentQuantity.value === '00')) {
      event.preventDefault();
      currentQuantity.setAttribute('style', 'border: 1px solid red');
      setTimeout(() => {
        currentQuantity.removeAttribute('style', 'border: 1px solid red');
      }, 1000);
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
    <div className="goods-wrapper">
      <div className="goods-field" onClick={clickHandler}>
        {goods.map((item) => (
          <Goods data={item} key={item.articul} isValid={inputIsValid} isEmpty={inputIsEmpty} />
        ))}
      </div>
    </div>
  );
};

export default GoodsList;
