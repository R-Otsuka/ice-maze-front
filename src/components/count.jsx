import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../reducers/counterSlice'

// 作るのは氷の床
export const Count = () => {
  const count = useSelector((state)  => state.counter.value);
  const dispatch = useDispatch();
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