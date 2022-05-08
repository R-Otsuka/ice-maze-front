import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../reducers/counterSlice'
import store from './store' // 拡張子なしでもimportできる機能
import Count from './count';
import Floor from './components/floor';




// zip-frontに合わせる。
// react-routerで出しわけする、route.jsにルーティングモリモリ書いておいて、mapで<route>でwrapしたやつ出す。
ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Count />} />
        <Route path="/ice" element={<Floor />} />
        {/* <Route path="page1" element={<Page1 />} /> */}
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);