import React, { useState, useEffect } from 'react';
import * as ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import store from './store'

import Dashboard from './components/Dashboard';
import IceMaze from './components/IceMaze';

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ice_maze" element={<IceMaze />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
