import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import { iceMazeReducer } from './slice/ice_maze'
import { errorReducer } from './slice/error';

const reducer = {
  error: errorReducer,
  ice_maze: iceMazeReducer,
}

// reducerをstoreに登録
export default configureStore({
  reducer,
  middleware: [thunk, logger]
});
