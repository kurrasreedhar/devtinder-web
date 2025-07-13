import { useState } from "react";
import axios from "axios";
import { addUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Base_URL } from "../utils/constants";


export const Login=()=>{
    const dispatch= useDispatch()
    const navigate= useNavigate()
    const [val,setVal]= useState(true)
    const [error,setError]= useState("")
    const [firstName,setFirstName]= useState("")
    const [lastName,setLastName]= useState("")
    const [emailId,setEmailId]= useState("")
    const [password,setPassword]= useState("")
    const loginHandler=async()=>{
      setError("")
    try {
      const res = await axios.post( Base_URL+"/login",{ emailId,  password,},{ withCredentials: true });
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      console.log(err)
      setError(err.response.data || "something went wromg")
    }
  };
    const signUpHandler=async()=>{
      setError("")
   try{
    const res= await axios.post(Base_URL+"/signup",{firstName,lastName,emailId,password},{withCredentials: true });
    console.log(res)
    dispatch(addUser(res?.data?.data))
   return navigate("/profile");
    } catch (err) {
      console.log(err)
      setError(err.response.data || "something went wromg")
      }  }
       
   return (

<div className=" flex justify-center items-center ">
   <div className="card card-border bg-slate-900 w-90">
  <div className="card-body">
    <h2 className="card-title justify-center text-white text-2xl">{val? "Login":"SignUp"}</h2>
     { !val && <fieldset className="fieldset px-8">
 <legend className="fieldset-legend text-white text-lg">Firstname</legend>
  <input type="text" className="input" value={firstName} placeholder="Type here" onChange={(e)=>{setFirstName(e.target.value)}} />
</fieldset>}
 {!val &&   <fieldset className="fieldset px-8">
  <legend className="fieldset-legend text-white text-lg">Lastname</legend>
  <input type="text" className="input" value={lastName} placeholder="Type here" onChange={(e)=>{setLastName(e.target.value)}} />
</fieldset>}
    <fieldset className="fieldset px-8">
  <legend className="fieldset-legend text-white text-lg">Email</legend>
  <input type="text" className="input" value={emailId} placeholder="Type here" onChange={(e)=>{setEmailId(e.target.value)}} />
</fieldset>
<fieldset className="fieldset px-8">
  <legend className="fieldset-legend text-white text-lg">Password</legend>
  <input type="password" className="input" value={password} placeholder="Type here" onChange={(e)=>{setPassword(e.target.value)}}  />
</fieldset>
 <p className="text-red-800 flex justify-center text-xl ">{error}</p>
    <div className="card-actions flex flex-col items-center py-2">
      <button className="btn btn-primary" onClick={val? loginHandler:signUpHandler}>{val? "Login":"SignUp"}</button>
      <h2 className="text-lg text-white my-1" onClick={()=>setVal(!val)}> {val?  "New to DevTinder, SignUp Here": "Already a member, kindly login"} </h2>
    </div>
    
  </div>
</div>
    </div>)
}