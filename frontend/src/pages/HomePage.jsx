import React, { useState } from 'react'

import {  Navigate, useNavigate } from 'react-router-dom';


const HomePage = () => {
  let usertoken=JSON.parse(localStorage.getItem("token"));
  const navigate=useNavigate()
if(!usertoken){
  return navigate("/login")
}

  return (
    <div>
      <h1>HomePage</h1>
    </div>
  )
}

export default HomePage