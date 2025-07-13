import { Outlet, useNavigate } from "react-router-dom"
import { Navbar } from "./Navbar"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../redux/userSlice"
import { useSelector } from "react-redux"
import { Base_URL } from "../utils/constants"

export const Body=()=>{
    const user= useSelector(store=>store.user)
    const dispatch= useDispatch()
    const navigate=useNavigate()
 ;
    const getLoggedInfo= async()=>{
           if(user) return ;
    try{
        const res= await axios.get(Base_URL+"/profile",{withCredentials:true})
            dispatch(addUser(res.data))
 }
    catch(err){
                console.error(err.message)
                navigate("/login")
            }}
    useEffect(()=>{
     getLoggedInfo()
    },[])
    return(
        <div >
            <Navbar/>
            <Outlet/>
           
        </div>
    )
}