const Goods = (props) => {
  return (
    <div className="goods-block">
      <img src={props.data.image} alt="" />
      <p>{props.data.title}</p>
      <p>{props.data.cost}</p>
      <button className="add-to-cart" data-key={props.data.articul}>
        Add to cart
      </button>
    </div>
  );
};

export default Goods;
