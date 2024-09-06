import React from 'react'
import { useDispatch } from 'react-redux'
import  {logout}  from '../../store/authSlice'
import authService  from '../../appwrite/auth'


function LogoutBtn() {
    const dispatch =  useDispatch()

    const LogOutHandler = ()=>{
        authService.LogOut().then(()=>{
            dispatch(logout())
        })
    }
  return (
    <button onClick={LogOutHandler} className='inline-bock px-6 py-2 duration-200 hover:bg-yellow-300 rounded-xl'>
     LogOut
    </button>
  )
}

export default LogoutBtn
