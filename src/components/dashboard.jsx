import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"
import { fetchSync } from '../reducers/iceSlice'

export const Dashboard = () => {
  // const dispatch = useDispatch();
  // const maze = useSelector((state)  => state.ice.value);
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);
  return (
    <div>
      <button
        onClick={() => {
          navigate("/ice", { state: { id: 1 } })
        }}
      >
        sss
      </button>
    </div>
  )
}

export default Dashboard;