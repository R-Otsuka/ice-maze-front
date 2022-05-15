import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import counterReducer from './reducers/counterSlice'

// reducerをstoreに登録
export default configureStore({
  reducer: {
    counter: counterReducer,
  }
})