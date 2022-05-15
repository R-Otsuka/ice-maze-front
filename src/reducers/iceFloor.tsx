// ここは本来actionで記載する
import axios from 'axios';
import _ from 'lodash';

import { createSlice } from '@reduxjs/toolkit'

const API_PATH = 'ice_maze'

export type IceFloor = {
  value: number
}

export const iceFloorSlice = createSlice({
  name: 'ice_floor',
  initialState: {
    value: 0,
  },
  reducers: {
    fetch: (state) => {
      const url = `${process.env.HOST}/manager/v1/${API_PATH}`;
      axios
        .get(url)
        .then((res) => {
          state.value += res.data.num;
        })
    },
  },
})

// Action creators are generated for each case reducer function
export const { fetch } = iceFloorSlice.actions

export default iceFloorSlice.reducer