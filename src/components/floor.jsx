import { replace } from 'lodash';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom"
import { fetchSync } from '../slice/floor'

export const Floor = () => {
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
          {/* Node.jsでパスワードや環境変数などを扱うとき */}
          {process.env.BUCKET_NAME}
          {maze}
        </button>
      </div>
    </div>
  )
}

export default Floor;