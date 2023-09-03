import axios from 'axios';
import _ from 'lodash';

import { createSlice } from '@reduxjs/toolkit'
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
      return updateData;
    },
  }
});

export const createMaze = () => {
  const url = `${process.env.HOST}/${API_PATH}`;
  return async (dispatch) => {
    axios
      .get(url)
      .then((res) => {
        dispatch(floorSlice.actions.create(res.data ));

      }).catch((error) => {
        dispatch(createError({ message: 'mapの作成に失敗しました' }));
      });
  };
};

export const evolveMaze = (data) => {
  const url = `${process.env.HOST}/${API_PATH}/evolve`;
  return async (dispatch) => {
    axios
      .post(url, data)
      .then((res) => {
        dispatch(floorSlice.actions.update(res.data ));

      }).catch((error) => {
        dispatch(createError({ message: 'mapの更新に失敗しました' }));
      });
  };
};

export const floorReducer = floorSlice.reducer;
