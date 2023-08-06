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
    () => dispatch(fetchData());
    const start = dayjs();
    const end = dayjs().add(20, 'day');
    const diff = end.diff(start, 'month');
  }, []);


  const renderMap = (maze) => {
    const content = (
      <div className={styles.map}>
        {_.map(maze, (row, index) => {
          return (
            // エラー邪魔なので、止む無しkey=index
            <div className={styles.row} key={index}>
              {_.map(row, (val) => {
                return <div className={`${styles.cell} ${val ? styles.ice : styles.stone}`}></div>
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
      <div className={styles.header}>
        <button
          onClick={() => {
            dispatch(createMaze());
          }}
        >
          迷路を作る
        </button>
      </div>
      <div className={styles.body}>
        {renderMap(maze)}
      </div>
    </div>
  )
}

export default Floor;