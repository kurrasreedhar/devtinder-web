import axios from "axios"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest,removeRequest } from "../redux/requestSlice";

export const Requests=()=>{
   const Requests= useSelector(store=>store?.request)
   const dispatch= useDispatch()
   const requestApiHandler=async()=>{
    try{
        const res= await axios.get("http://localhost:5566/user/request/pendings",{withCredentials: true})
         dispatch(addRequest(res?.data?.connections))
    } 
    catch(err){
        console.log(err.message)
    }
   }
   useEffect(()=>{
    requestApiHandler()
   },[])

    const requestHandler=async(status,id)=>{
         await axios.post("http://localhost:5566/request/review/" + status +"/"+id ,{},{withCredentials: true}) 
        dispatch(removeRequest(id))}

   return  (<div className="text-center my-6"> 
             <h1 className="text-red-800 text-3xl">Requests</h1>
        {Requests?.length>0?  (Requests.map((request)=>{
            const id=request._id
            const {photoUrl,_id,firstName,lastName,bio,age,gender}= request.fromUserId
            return (<div className="mx-auto w-[37%]" key={_id} > 
                   <div className=" my-2 py-2 flex justify-start items-center bg-blue-950">
                    <div ><img className="rounded-full mx-2 w-20 h-20" src={photoUrl} alt="photo"/></div>
                    <div className="flex flex-col items-start mx-2 " > <h2 className="text-white">{firstName + " " + lastName}</h2>
                     <h2 className="text-white">{age + " , " + gender}</h2>
                          <p className="text-white">{bio}</p>
                          </div>
                           <button className="btn btn-success mx-2 " onClick={()=>requestHandler("rejected",id)}>reject</button>
                          <button className="btn btn-info mx-2 " onClick={()=>requestHandler("accepted",id)}>accept</button>
                   </div>
            </div>)
        })):<h1> no request</h1>}
         
     
    </div>)
}