import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../reducers/counterSlice.js'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})