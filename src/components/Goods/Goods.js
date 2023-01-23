import './Goods.css';
import React, { useEffect } from 'react';

const Goods = (props) => {
  const inputQuantity = React.createRef();

  useEffect(() => {
    inputQuantity.current.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
  });

  return (
    <div className="goods-block">
      <img src={require(`../../img/${props.data.image}`)} alt="" />
      <p className="good-title">{props.data.title}</p>
      <p className="price">{props.data.cost}</p>
      <div className="change-quantity">
        <button className="minus-quantity" data-key={props.data.articul}>
          -
        </button>
        <input
          id={props.data.articul}
          type="text"
          defaultValue="1"
          ref={inputQuantity}
          onKeyDown={props.isValid}
          onBlur={props.isEmpty}
          maxLength="2"
        ></input>
        <button className="plus-quantity" data-key={props.data.articul}>
          +
        </button>
      </div>
      <button className="add-to-cart" data-key={props.data.articul}>
        Добавить в корзину
      </button>
    </div>
  );
};

export default Goods;
