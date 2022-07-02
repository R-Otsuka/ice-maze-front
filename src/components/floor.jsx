import { replace } from 'lodash';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom"
import { fetchSync } from '../reducers/iceSlice'

export const IceFloor = () => {
  const dispatch = useDispatch();
  const maze = useSelector((state)  => state.ice.value);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
        >
          {process.env.BUCKET_NAME}
          {maze}
        </button>
      </div>
    </div>
  )
}

export default IceFloor;