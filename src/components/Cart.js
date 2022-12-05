const Cart = (props) => {
  console.log(props);
  return (
    <>
      <tr key={props.quantity * props.dataArticul.cost}>
        <td>
          <img src={props.dataArticul.image} width="30px" alt="productImage" />
        </td>
        <td>{props.dataArticul.title}</td>
        <td>{props.dataArticul.cost}</td>
        <td>{props.quantity}</td>
        <td>{props.quantity * props.dataArticul.cost}</td>
        <td>
          <button className="minus" data-key={props.dataArticul.articul}>
            -
          </button>
        </td>
        <td>
          <button className="plus" data-key={props.dataArticul.articul}>
            +
          </button>
        </td>
        <td>
          <button className="deleteItem" data-key={props.dataArticul.articul}>
            x
          </button>
        </td>
      </tr>
    </>
  );
};

export default Cart;
