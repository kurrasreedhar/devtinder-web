import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addconnections } from "../redux/connectionSlice";


export const Connections=()=>{
    const dispatch=useDispatch();
    const connections= useSelector(store=>store?.connection)
      
const connectionsHandler=async()=>{    
    try{
    const res= await axios.get("http://localhost:5566/user/request/connections",{withCredentials: true})
     dispatch(addconnections(res.data))
    }
    catch(err){
        console.error(err.message)
    }
}

 useEffect(()=>{
  connectionsHandler()
 },[])
 if(connections?.length===0) return <h1>no connections </h1>

     return  (<div className="text-center my-6"> 
             <h1 className="text-red-800 text-3xl">Connections</h1>
        {connections?.length>0?  (connections.map((connection)=>{
            const {photoUrl,_id,firstName,lastName,bio,age,gender}= connection
            return (<div className="mx-auto w-1/3" key={_id} > 
                   <div className=" my-2 py-2 flex justify-start items-center bg-blue-950">
                    <div ><img className="rounded-full mx-2 w-20 h-20" src={photoUrl} alt="photo"/></div>
                    <div className="flex flex-col items-start " > <h2 className="text-white">{firstName + " " + lastName}</h2>
                     <h2 className="text-white">{age + " , " + gender}</h2>
                          <p className="text-white">{bio}</p></div>
                        
                   </div>
            </div>)
        })):<h1> no connections</h1>}
         
     
    </div>)
}