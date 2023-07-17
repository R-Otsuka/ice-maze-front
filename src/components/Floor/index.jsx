import _, { replace } from 'lodash';
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom"
import { fetchData, createMaze } from '../../slice/floor'
import styles from "./style.modules.scss";

export const Floor = () => {
  const dispatch = useDispatch();
  const maze = useSelector((state)  => state.floor.value) || [[0, 1, 1], [0, 0, 0], [1, 0, 0]];
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  console.log(maze);
  console.log(styles);


  const createMap = (maze) => {
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
          // onClick={() => {
          //   // api通信部分
          //   createMaze()
          // }}
        >
          迷路を作る
        </button>
      </div>
      <div styleName="body">
        {createMap(maze)}
      </div>
    </div>
  )
}

export default Floor;