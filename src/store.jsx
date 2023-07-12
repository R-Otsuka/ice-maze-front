import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import { floorReducer } from './slice/floor'
import { dashboardReducer } from './slice/dashboard'

const reducer = {
  floor: floorReducer,
  dashboard: dashboardReducer,
}

// reducerをstoreに登録
export default configureStore({
  reducer,
  middleware: [thunk, logger]
});