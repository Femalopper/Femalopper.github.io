const Cart = (props) => {
  console.log(props);
  return (
    <>
      <tr key={props.quantity * props.dataArticul.cost}>
        <td>
          <div className="cart-good-name">
            <div className="good-image">
              <img src={require(`../img/${props.dataArticul.image}`)} width="30px" alt="productImage" />
            </div>
            <p className="good-name">{props.dataArticul.title}</p>
          </div>
        </td>
        <td>{props.dataArticul.cost}</td>
        <td>{props.quantity * +props.dataArticul.cost}</td>
        <td>
          <button className="minus" data-key={props.dataArticul.articul}>
            -
          </button>
          {props.quantity}
          <button className="plus" data-key={props.dataArticul.articul}>
            +
          </button>
        </td>
        <td>
          <button className="delete-item" data-key={props.dataArticul.articul}>
            ×
          </button>
        </td>
      </tr>
    </>
  );
};

export default Cart;
