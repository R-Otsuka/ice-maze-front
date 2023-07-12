import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import counterReducer from './slice/counter'
import iceReducer from './slice/floor'
import dashboardReducer from './slice/dashboard'
import logger from 'redux-logger'

// reducerをstoreに登録
export default configureStore({
  reducer: {
    counter: counterReducer,
    ice: iceReducer,
    dashboard: dashboardReducer,
  },
  middleware: [thunk, logger]
})