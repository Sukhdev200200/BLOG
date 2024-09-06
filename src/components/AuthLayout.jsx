import { useState,useEffect } from "react";
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protection({
    children,authentication =true
}){
    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)
    const Authstatus = useSelector((state)=>state.auth.status)

    useEffect(() => {
        if(authentication && Authstatus !== authentication){
            navigate("/login")
        }else if(!authentication && Authstatus !== authentication){
            navigate("/")
        }
        setLoader(false)
     
    }, [navigate,authentication,Authstatus])

    return loader ? null :<>{children}</>

}