import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../reducers/counterSlice'
import store from './store' // 拡張子なしでもimportできる機能
import HelloWorld from './helloWorld';




// zip-frontに合わせる。
// react-routerで出しわけする、route.jsにルーティングモリモリ書いておいて、mapで<route>でwrapしたやつ出す。
ReactDom.render(
  <Provider store={store}>
    <HelloWorld />
  </Provider>,
  document.getElementById('app')
);