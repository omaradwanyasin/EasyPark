import React from 'react'
import "./LoginBtn.css"
function LoginBtn({name}) {
  return (
   <div >
   <button className='button'>{name}</button>
   </div>
  )
}

export default LoginBtn