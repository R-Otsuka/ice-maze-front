import axios from 'axios';
import _ from 'lodash';

import { createSlice } from '@reduxjs/toolkit'

// ロジックはここに記載してはダメ
const API_PATH = 'floor';

const initialState = {
  test: 'text',
  value: 0,
}


const floorSlice = createSlice({
  name: 'floor',
  initialState,
  reducers: {
    fetch: (state, action) => {
      const updatedData = { ...state, ...action.payload };
      return updatedData;
    },
    changeName: (state, action) => {
      state.name = action.payload;
    }
  },
});

// actionをエクスポート
export const {
  fetch, changeName
} = floorSlice.actions;

// reducerをエクスポート
export const user = floorSlice.reducer;