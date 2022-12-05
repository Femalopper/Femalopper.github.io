import './App.css';
import CartList from './containers/CartList';
import GoodsList from './containers/GoodsList';

const App = () => {
  return (
    <div>
      <GoodsList />
      <CartList />
    </div>
  );
};

export default App;
