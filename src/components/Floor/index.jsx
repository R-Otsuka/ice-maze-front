import { replace } from 'lodash';
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom"
import { fetchData, createMaze } from '../../slice/floor'

export const Floor = () => {
  const dispatch = useDispatch();
  const maze = useSelector((state)  => state.floor.value);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const createRow = (row) => {
    return _.map(row, (val, index) => {
      if (val === 'ice') {
        return 1;
      }
      return 0; // block
    }) 
  }

  const createMaze = (map) => {
    return _.map(map, (row) => {
      return createRow(row);
    })
  }

  return (
    <div>
      <div styleName="head">
        <button
          onClick={createMaze()}
        >
          迷路を作る
        </button>
      </div>
      <div styleName="body">
        <div styleName="maze">
          {_.map(maze, (row) => {
            return row;
          })};
        </div>
      </div>
    </div>
  )
}

export default Floor;