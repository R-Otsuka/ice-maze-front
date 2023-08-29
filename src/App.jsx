import React, { useState, useEffect } from 'react';
import * as ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import store from './store'

import Dashboard from './components/Dashboard';
import Floor from './components/Floor';

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/floor" element={<Floor />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);