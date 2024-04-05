import React from 'react'
import "./LoginBtn.css"
function LoginBtn({name, type="submit"}) {
  return (
   <div >
   <button className='button' type='submit'>{name}</button>
   </div>
  )
}

export default LoginBtn