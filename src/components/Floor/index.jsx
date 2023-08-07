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
  const { map, start, goal, score } = useSelector((state) => state.floor);
  const navigate = useNavigate();
  const location = useLocation();
  const [position, setPosition] = useState({});
  const [stepCount, setStepCount] = useState(0);

  const DIRECTION = { left: { x: -1, y: 0 }, right: { x: 1, y: 0 }, up: { x: 0, y: -1 }, down: { x: 0, y: 1 } };
  const calculateNewPosition = (x, y, dx, dy) => {
      // 22 === mapのサイズ、TODO: 可変にす
    if (x + dx < 0 || x + dx >= 22 || y + dy < 0 || y + dy >= 22 || map[y + dy][x + dx] !== 1) {
        console.log(x, y, 'return');
        return { x, y };
      }
      return calculateNewPosition(x + dx, y + dy, dx, dy);
    }
  const getNewPosition = (keyType) => {
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
    const newPosition = getNewPosition(keyType);
    if (newPosition.x === position.x & newPosition.y === position.y) {
      return;
    }
    setPosition(newPosition);
    setStepCount(stepCount + 1);
  }, [stateOfKey]);

  const iconMap = {
    2: rock,
    1: ice,
    's': satoshi,
    'g': ball,
  }

  const renderMap = (map) => {
    const content = (
      <div className={styles.map}>
        {_.map(map, (row, y) => {
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
      <div className={styles.menu}>
        <button
          onClick={() => {
            setPosition(start);
            setStepCount(0);
          }}
        >
          最初に戻る
        </button>
      </div>
      <div>
        カウント: <span>{stepCount}</span>
      </div>
      <div>
        mapスコア: {score}
      </div>
      <div className={styles.body}>
        {renderMap(map)}
      </div>
    </div>
  )
}

export default Floor;