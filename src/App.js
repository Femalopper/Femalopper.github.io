import CartList from './containers/Cartlist/CartList';
import GoodsList from './containers/GoodsList/GoodsList';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Error from './components/Error/Error';

// для полноценного интернет-магазина заполнить панель навигации
const list = {
  nav: [{ link: '/', text: 'Каталог товаров' }],
};

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Header data={list} />}>
            <Route index element={<GoodsList />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Router>
      <CartList />
    </>
  );
};

export default App;
