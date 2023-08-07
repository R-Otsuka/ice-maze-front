import axios from 'axios';
import _, { update } from 'lodash';

import { createSlice } from '@reduxjs/toolkit'
import { useParams } from 'react-router-dom';
import { createError } from './error';

const API_PATH = 'floor';

const initialState = {
  map: [[]],
  start: { x: 0, y: 0 },
  goal: { x: 0, y: 0 },
  stone_count: 0,
  floor_length: 0,
  score: 0,
  value: 0,
};

const url = `${process.env.HOST}/${API_PATH}`;
console.log(url);

const floorSlice = createSlice({
  name: 'floor',
  initialState,
  reducers: {
    fetch: (state, action) => {
      const updatedData = { ...state, ...action.payload };
      return updatedData;
    },
    create: (state, action) => {
      const updateData = { ...state, ...action.payload };
      console.log(updateData, 'updateData')
      return updateData;
    },
  }
});

const { fetch, create } = floorSlice.actions;

export const fetchData = () => {
  const url = `${process.env.HOST}/${API_PATH}`;
  console.log('北');
  return async (dispatch) => {
    axios
      .get(url)
      .then((res) => {
        dispatch(fetch(res.data));
      }).catch((error) => {
        dispatch(createError({ message: 'mapの読み込みに失敗しました' }));
      });
  };
};

export const createMaze = () => {
  const url = `${process.env.HOST}/${API_PATH}`;
  return async (dispatch) => {
    axios
      .get(url)
      .then((res) => {
        console.log(res.data, 'res');
        dispatch(floorSlice.actions.create(res.data ));

      }).catch((error) => {
        dispatch(createError({ message: 'mapの作成に失敗しました' }));
      });
  };
};

// actionをエクスポート

// reducerをエクスポート
export const floorReducer = floorSlice.reducer;