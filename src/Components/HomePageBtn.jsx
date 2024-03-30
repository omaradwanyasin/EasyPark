import React from 'react'
import "./Navbar/navStyle.css"
import "./HomePageBtn.css"
import { useNavigate } from 'react-router-dom'
function HomePageBtn({name,destination}) {
    const navigate = useNavigate();
    const handleClick=()=>{
      navigate(destination);
    }
  return (
    <div>
        <button onClick={handleClick}>{name}</button>
    </div>
  )
}

export default HomePageBtn