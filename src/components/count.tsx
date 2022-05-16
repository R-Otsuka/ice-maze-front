import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../reducers/counterSlice'
import { Counter } from '../reducers/counterSlice'

export type RootState = {
  counter: Counter
}
// 作るのは氷の床
export const Count = () => {
  const count = useSelector((state: RootState)  => state.counter.value);
  const dispatch = useDispatch();
  console.log(process.env);
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          {process.env.BUCKET_NAME}
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}

export default Count;