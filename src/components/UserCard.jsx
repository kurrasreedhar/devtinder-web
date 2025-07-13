import axios from "axios"
import { removeSingleFeed } from "../redux/feedSlice"
import { useDispatch } from "react-redux"
import { Base_URL } from "../utils/constants"

export const UserCard=({fields})=>{
  const dispatch= useDispatch()
  const {_id ,firstName,lastName,photoUrl,bio,age,gender}=fields
   const id= _id;

const requestHandler=async(status,id)=>{
  try{
     const res = await axios.post(Base_URL+"/request/send/"+ status + "/" + id,{},{withCredentials: true })
     console.log(res)
     dispatch( removeSingleFeed(id))}
     catch(err){
      console.error(err.message)
     }
}
    if(!fields) return
 
    return(<div className="flex justify-center items-center my-8">
     <div className="card bg-base-300 w-80 shadow-sm">
  <figure className="my-3">
   {photoUrl? <img  src={ photoUrl} alt="user" />:null}
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName +" "+ lastName}</h2>
     <h2 className="card-title"> {age}, {gender}</h2>
    <p>{bio}</p>
    <div className="card-actions justify-center">
        <button className="btn btn-secondary" onClick={()=>requestHandler("ignore",id)}>ignore</button>
      <button className="btn btn-primary" onClick={()=>requestHandler("interesed",id)}>Interesed</button>
    </div>
  </div>
</div>
    </div>)
}