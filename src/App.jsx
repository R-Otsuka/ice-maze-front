import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './slice/counter'
import store from './store'
import Count from './components/count';
import Floor from './components/floor';
import Dashboard from './components/index';

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ice" element={<Floor />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);