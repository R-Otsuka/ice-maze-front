import axios from 'axios';
import _ from 'lodash';

import { createSlice } from '@reduxjs/toolkit'
import { createError } from './error';

import { AppDispatch } from '../store';

const API_PATH = 'ice_maze';

export type Position = { x: number, y: number };
export type Cell = 1 | 2 | 's' | 'g';
interface IceMazeState {
  map: Array<Array<Cell>>,
  start: Position,
  goal: Position,
  stone_count: number,
  size: number,
  score: number,
  min_steps: number,
  path: Array<Position>,
}

const initialState: IceMazeState = {
  map: [[]],
  start: { x: 0, y: 0 },
  goal: { x: 0, y: 0 },
  stone_count: 0,
  size: 0,
  score: 0,
  min_steps: 0,
  path: [],
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

export const RootState = {
  ice_maze: iceMazeSlice.reducer,
};

export const createMaze = () => {
  const url = `${process.env.HOST}/${API_PATH}/map`;
  return async (dispatch: AppDispatch) => {
    axios
      .get(url)
      .then((res) => {
        dispatch(iceMazeSlice.actions.create(res.data));

      }).catch((error) => {
        dispatch(createError({ message: 'mapの作成に失敗しました' }));
      });
  };
};

export const evolveMaze = (data) => {
  const url = `${process.env.HOST}/${API_PATH}/evolve`;
  return async (dispatch: AppDispatch) => {
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
