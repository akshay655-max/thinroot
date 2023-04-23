import React, { useState } from 'react'

const PostsData = () => {
    const [data,setData]=useState([]);
  return (
    <>
    {
        data && data.map((ele)=>(
            <li></li>
        ))
    }
    </>
  )
}

export default PostsData