import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import counterReducer from './reducers/counterSlice'
import iceReducer from './reducers/iceSlice'
import dashboardReducer from './reducers/dashboardSlice'
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