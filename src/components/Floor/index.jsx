import _, { replace } from 'lodash';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom"
import { fetchData, createMaze } from '../../slice/floor'
import styles from "./style.modules.scss";
import Button from '@mui/material/Button';
import ice from '../../img/ice_maze/ice.jpg';
import rock from '../../img/ice_maze/rock.jpg';

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
            <div className={styles.row} key={index}>
              {_.map(row, (val) => {
                return <img src={val ? rock : ice} />
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