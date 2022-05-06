import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../reducers/counterSlice.js'
import store from './store.js' // 拡張子なしでもimportできる機能
import HelloWorld from './helloWorld';



ReactDom.render(
  <Provider store={store}>
    <HelloWorld />
  </Provider>,
  document.getElementById('app')
);