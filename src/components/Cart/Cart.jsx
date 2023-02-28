import React from 'react';
import require from 'requirejs';

const Cart = (props) => {
  const { quantity } = props;
  const { image, cost, title, articul } = props.dataArticul;

  return (
    <>
      <tr key={quantity * cost}>
        <td>
          <div className="cart-good-name">
            <div className="good-image">
              <img src={require(`../../img/${image}`)} width="45px" alt="productImage" />
            </div>
            <p className="good-name">{title}</p>
          </div>
        </td>
        <td>{cost}</td>
        <td>{quantity * cost}</td>
        <td>
          <button className="minus" data-key={articul} data-click="minus">
            -
          </button>
          {quantity}
          <button className="plus" data-key={articul} data-click="plus">
            +
          </button>
        </td>
        <td className="delete-item-td">
          <button className="delete-item" data-key={articul} data-click="delete-item">
            ×
          </button>
        </td>
      </tr>
    </>
  );
};

export default Cart;
