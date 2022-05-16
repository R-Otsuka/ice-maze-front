// ここは本来actionで記載する
import axios from 'axios';
import _ from 'lodash';

import { createSlice } from '@reduxjs/toolkit'

const API_PATH = 'ice';
// こういうところ、icefloorとかつけなくて良くね？
export const iceSlice = createSlice({
  name: 'ice',
  initialState: {
    value: 0,
  },
  reducers: {
    fetch: (state, action) => {
      console.log(action);
      state.value += action.payload.num;
    },
  },
})

// Action creators are generated for each case reducer function
export const { fetch } = iceSlice.actions

export const fetchSync = () => async (dispatch)=> {
  const url = `${process.env.HOST}/${API_PATH}`;
  console.log(url);
  const req =
  await axios
    .get(url)
    .then((res) => {
      console.log(url, res);
      dispatch(fetch(res.data))
    });
}

export default iceSlice.reducer