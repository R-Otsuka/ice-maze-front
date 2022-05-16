import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetch } from '../reducers/iceSlice'
import { IceType } from '../reducers/iceSlice'

export type RootState = {
  ice: IceType
}

export const IceFloor = () => {
  const dispatch = useDispatch();
  const maze = useSelector((state: RootState)  => state.ice.value);

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