import axios from 'axios';
import _ from 'lodash';

import { createSlice } from '@reduxjs/toolkit'
import { useParams } from 'react-router-dom';

const API_PATH = 'error';

const initialState = {
  message: '',
  description: '',
};

const errorSlice = createSlice({
  name: API_PATH,
  initialState,
  reducers: {
    createError: (state, action) => {
      const updatedData = { ...state, ...action.payload };
      return updatedData;
    },
  }
});


// actionをエクスポート
export const { createError } = errorSlice.actions

// reducerをエクスポート
export const errorReducer = errorSlice.reducer;
