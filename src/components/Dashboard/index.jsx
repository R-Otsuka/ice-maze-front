import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"
import { floorAction } from '../../slice/floor'

export const Dashboard = () => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div>
      <button
        onClick={() => {
          navigate("/floor");
        }}
      >
        氷の迷路
      </button>
    </div>
  )
}

export default Dashboard;