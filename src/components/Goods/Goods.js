import './Goods.css';

const Goods = (props) => {
  return (
    <div className="goods-block">
      <img src={require(`../../img/${props.data.image}`)} alt="" />
      <p className="good-title">{props.data.title}</p>
      <p className="price">{props.data.cost}</p>
      <div className="change-quantity">
        <button className="minus-quantity" data-key={props.data.articul}>
          -
        </button>
        <input id={props.data.articul} type="number" defaultValue="1" onKeyDown={props.isValid} onBlur={props.isEmpty}></input>
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
