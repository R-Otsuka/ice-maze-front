import _, { replace } from 'lodash';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import clsx from 'clsx';

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom"
import { createMaze, evolveMaze } from '../../slice/ice_maze'
import styles from "./style.module.scss";
import ice from '../../img/ice_maze/ice.jpg';
import rock from '../../img/ice_maze/rock.jpg';
import satoshi from '../../img/ice_maze/satoshi.jpg';
import ball from '../../img/ice_maze/ball.jpg';
import { usePressKeyStatus } from '../../hooks/usePressKeyStatus';
import { useCanvas } from '../../hooks/useCanvas';

export const IceMaze = () => {
  const dispatch = useDispatch();
  const { map, start, goal, score, min_steps, path } = useSelector((state) => state.ice_maze);
  const navigate = useNavigate();
  const location = useLocation();
  const { canvasRef, getContext } = useCanvas();
  const [position, setPosition] = useState({});
  const [stepCount, setStepCount] = useState(0);
  const [isShowAnswer, setIsShowAnswer] = useState(false);

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
    // () => dispatch(fetchData());
  }, []);

  useEffect(() => {
    const ctx = getContext();
    ctx.clearRect(0, 0, 630, 660);
    ctx.strokeStyle = 'red';

    // パスの開始
    ctx.beginPath();
    // 1本目
    _.each(path, (val, i) => {
      console.log(val, i, 'val, i');
      const current = path[i];
      const next = path[i + 1];
      if (!next) {
        return;
      }
      console.log(current.x * 30 + 15, current.y * 30 + 15);
      console.log(next.x * 30 + 15, next.y * 30 + 15);
      ctx.moveTo(current.x * 30 + 15, current.y * 30 + 15);
      ctx.lineTo(next.x * 30 + 15, next.y * 30 + 15);
    });
    // ctx.moveTo(50, 40); // (x, y)
    // ctx.lineTo(250, 40);
    // // 2本目
    // ctx.moveTo(50, 80);
    // ctx.lineTo(250, 80);
    // // 3本目
    // ctx.moveTo(50, 120);
    // ctx.lineTo(250, 120);
    // 描画
    ctx.stroke();
  }, [path]);

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

  const renderAnswer = (map) => {
    const context = (
      <div>
        <canvas width={630} height={660} className="canvas" ref={canvasRef} />
      </div>
    );
    return context;
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
        移動回数: <span>{stepCount}</span>
      </div>
      <div className={styles.flex}>
        <span>難易度: {score}</span>
        <span>最小移動回数: {min_steps}</span>
      </div>
      <div className={styles.flex}>
        <button
          onClick={() => {
            dispatch(evolveMaze(-1));
          }}
        >
          難易度を下げる
        </button>
        <button
          onClick={() => {
            dispatch(evolveMaze(1));
          }}
        >
          難易度を上げる
        </button>
      </div>
      <div className={styles.body}>
        {renderMap(map)}
          <div className={clsx(styles.answer, !isShowAnswer && styles.hidden)}>
            {renderAnswer(map)}
          </div>
      </div>
      <div>
        <div
          className={styles.accordion}
          onClick={() => {
            setIsShowAnswer(!isShowAnswer)
          }}
        >
          <div>{isShowAnswer ? '答えを閉じる' : '答えを見る'}</div>
          <div className={clsx(styles.arrow, isShowAnswer && styles.open)}>&gt;</div>
        </div>
        {isShowAnswer && (
          <>
            {_.map(path, (val, i) => {
              return (
                <div>[x, y] = [{val.x}, {val.y}]</div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}

export default IceMaze;
