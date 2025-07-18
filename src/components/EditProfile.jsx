import { useState } from "react"
import { UserCard } from "./UserCard"
import axios from "axios"
import { useDispatch, } from "react-redux";
import { addUser } from "../redux/userSlice";
import { Base_URL } from "../utils/constants";

export const Editprofile=({user})=>{
     if(!user) return
     const dispatch= useDispatch()
     const [error,setError]= useState("")
        const [showtoaster,setShowToaster]= useState(false)
        const [firstName,setFirstName]= useState(user?.firstName)
        const [lastName,setLastName]= useState(user?.lastName)
        const [age,setAge]=useState(user?.age || "")
        const [bio,setBio]= useState(user?.bio || "")
        const [photoUrl,setPhotoUrl]=useState(user?.photoUrl || "")
         const [gender,setGender]=useState(user?.gender)

         const SaveHandler=async()=>{
            
            try{
         const res=   await axios.patch(Base_URL+"/profile/edit",{
                firstName,lastName,age,bio,photoUrl,gender},{withCredentials: true})
                dispatch(addUser(res?.data?.data))
                setShowToaster(true) 
                setTimeout(()=>{
                      setShowToaster(false)
                },3000)
              }
                catch(err){
                    setError(err.message)
                }

         }
         
    return ( <><div className="flex justify-center">
     <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-90 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name:</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">Last Name:</span>
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                  <div className="label">
                    <span className="label-text">Photo URL :</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age:</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender:</span>
                  </div>
                  <input
                    type="text"
                    value={gender}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Bio:</span>
                  </div>
                  <input
                    type="text"
                    value={bio}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setBio(e.target.value)}
                  />
                </label>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={SaveHandler}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
       <UserCard fields={{firstName,lastName,bio,age,photoUrl,gender}}/>
    </div>
   {showtoaster && <div className="toast toast-top toast-center">
  <div className="alert alert-info">
    <span>profile saved successfully</span>
  </div></div>}
  </>)
}