// ここは本来actionで記載する
import axios from 'axios';
import _ from 'lodash';

import { createSlice } from '@reduxjs/toolkit'

const API_PATH = 'ice';

// こういうところ、icefloorとかつけなくて良くね？
export type IceType = {
  value: number
}

export const iceSlice = createSlice({
  name: 'ice',
  initialState: {
    value: 0,
  },
  reducers: {
    fetch: (state) => {
      const url = `${process.env.HOST}/api/${API_PATH}`;
      axios
        .get(url)
        .then((res) => {
          state.value += res.data.num;
        })
    },
  },
})

// Action creators are generated for each case reducer function
export const { fetch } = iceSlice.actions

export default iceSlice.reducer