import { useState,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import  Header  from './components/Header/Header'
import  Footer  from './components/Footer/Footer'
import './App.css'
import { login, logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'


function App() {
    const [loader,setLoader] = useState(true)
    const dispatch = useDispatch()

    useEffect(()=>{
      authService.GetCurrentUser().then((userDate)=>{
        if(userDate){
          dispatch(login({userDate}))
        }else{
          dispatch(logout())
        }
      })
      .finally(()=>{
        setLoader(false)
      })

    },[])
  
    return !loader?(
      <div>
        <div>
          <Header/>
          <main>
           <Outlet/>
          </main>
          <Footer/>
        </div>
      </div>

    ):null

    }



export default App
