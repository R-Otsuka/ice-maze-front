import _, { replace } from 'lodash';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom"
import { fetchData, createMaze } from '../../slice/floor'
import styles from "./style.modules.scss";

export const Floor = () => {
  const dispatch = useDispatch();
  const maze = useSelector((state)  => state.floor.map) || [[0, 1, 1], [0, 0, 0], [1, 0, 0]];
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // () => dispatch(fetchData());
    const start = dayjs();
    const end = dayjs().add(20, 'day');
    const diff = end.diff(start, 'month');
    console.log(diff, 'diff');
  }, []);

  console.log(maze, 'maze');
  console.log(styles);


  const renderMap = (maze) => {
    const content = (
      <div>
        {_.map(maze, (row) => {
          return (
            <div className={styles.row}>
              {_.map(row, (val) => {
                return <div className={`${styles.cell} ${val === 1 && styles.ice}`}></div>
              })}
            </div>
          )
        })}
      </div>
    );
    return content;
  }


  return (
    <div>
      <div styleName="head">
        <button
          onClick={() => {
            dispatch(createMaze());
          }}
        >
          迷路を作る
        </button>
      </div>
      <div styleName="body">
        {renderMap(maze)}
      </div>
    </div>
  )
}

export default Floor;