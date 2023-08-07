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
import satoshi from '../../img/ice_maze/satoshi.jpg';
import ball from '../../img/ice_maze/ball.jpg';
import { usePressKeyStatus } from '../../hooks/usePressKeyStatus';

export const Floor = () => {
  const dispatch = useDispatch();
  const maze = useSelector((state) => state.floor.map) || [[]];
  const start = useSelector((state) => state.floor.start);
  const goal = useSelector((state) => state.floor.goal);
  const navigate = useNavigate();
  const location = useLocation();
  const [position, setPosition] = useState({});

  const DIRECTION = { left: { x: -1, y: 0 }, right: { x: 1, y: 0 }, up: { x: 0, y: -1 }, down: { x: 0, y: 1 } };
  const calculateNewPosition = (x, y, dx, dy) => {
      // 20 === mazeのサイズ、TODO: 可変にする
    console.log(x, y, dx, dy, typeof x, typeof y, typeof dx, typeof dy, 'calculateNewPosition');
    console.log(y + dy, x + dx);
    if (x + dx < 0 || x + dx >= 20 || y + dy < 0 || y + dy >= 20 || maze[y + dy][x + dx] !== 1) {
        console.log(x, y, 'return');
        return { x, y };
      }
      return calculateNewPosition(x + dx, y + dy, dx, dy);
    }
  const newPosition = (keyType) => {
    const { x: _x, y: _y } = DIRECTION[keyType];
    return calculateNewPosition(position.x, position.y, _x, _y);
  }

  useEffect(() => {
    () => dispatch(fetchData());
  }, []);

  useEffect(() => {
    setPosition(start);
  }, [start]);

  const stateOfKey = usePressKeyStatus();
  useEffect(() => {
    const keyType = _.findKey(stateOfKey, (val, key) => val);
    if (!keyType) {
      return;
    }
    setPosition(newPosition(keyType));
  }, [stateOfKey]);

  const iconMap = {
    2: rock,
    1: ice,
    's': satoshi,
    'g': ball,
  }

  const renderMap = (maze) => {
    const content = (
      <div className={styles.map}>
        {_.map(maze, (row, y) => {
          return (
            <div className={styles.row}>
              {_.map(row, (val, x) => {
                if (position.x === x && position.y === y) {
                  return <img src={satoshi} className={styles.cell} />
                }
                return iconMap[val]
                  ? <img src={iconMap[val]} className={styles.cell} />
                  : <span className={styles.cell} />;
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