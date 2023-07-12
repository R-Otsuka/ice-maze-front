import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"
import { fetchSync } from '../slice/floor'

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
          navigate("/ice")
        }}
      >
        氷の迷路
      </button>
    </div>
  )
}

export default Dashboard;