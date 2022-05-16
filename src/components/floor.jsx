import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetch } from '../reducers/iceSlice'

export const IceFloor = () => {
  const dispatch = useDispatch();
  const maze = useSelector((state)  => state.ice.value);

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(fetch())}
        >
          {process.env.BUCKET_NAME}
          {maze}
        </button>
      </div>
    </div>
  )
}

export default IceFloor;