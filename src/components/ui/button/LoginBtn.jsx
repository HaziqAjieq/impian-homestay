import React from 'react'
import { useNavigate } from 'react-router-dom';
export default function LoginBtn() {
const navigate = useNavigate();

  const handleGoToLogin = () =>{
    navigate('/Login');
  }


  return (
    <>
    <button onClick={handleGoToLogin}>
      Login
    </button>
    </>
    
  )
}
