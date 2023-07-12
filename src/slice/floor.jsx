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
    fetchData: (state, action) => {
      const updatedData = { ...state, ...action.payload };
      return updatedData;
    },
    createMaze: (state, action) => {
      const updatedData = { ...state, ...action.payload };
      return updatedData;
    }
  },
});

// actionをエクスポート
export const { fetchData, createMaze } = floorSlice.actions;

// reducerをエクスポート
export const floorReducer = floorSlice.reducer;