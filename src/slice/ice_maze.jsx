import axios from 'axios';
import _ from 'lodash';

import { createSlice } from '@reduxjs/toolkit'
import { createError } from './error';

const API_PATH = 'ice_maze';

const initialState = {
  map: [[]],
  start: { x: 0, y: 0 },
  goal: { x: 0, y: 0 },
  stone_count: 0,
  map_size: 0,
  score: 0,
  value: 0,
};

const iceMazeSlice = createSlice({
  name: API_PATH,
  initialState,
  reducers: {
    create: (state, action) => {
      const createData = { ...state, ...action.payload };
      return createData;
    },
    evolve: (state, action) => {
      const updateData = { ...state, ...action.payload };
      return updateData;
    },
  }
});

export const createMaze = () => {
  const url = `${process.env.HOST}/${API_PATH}/map`;
  console.log('create');
  return async (dispatch) => {
    axios
      .get(url)
      .then((res) => {
        console.log(res, 'res');
        dispatch(iceMazeSlice.actions.create(res.data));

      }).catch((error) => {
        console.log(error, 'error');
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
        dispatch(iceMazeSlice.actions.evolve(res.data));

      }).catch((error) => {
        dispatch(createError({ message: 'mapの更新に失敗しました' }));
      });
  };
};

export const iceMazeReducer = iceMazeSlice.reducer;
