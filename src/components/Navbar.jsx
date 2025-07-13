import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { removeUser } from "../redux/userSlice"
import axios from "axios";
import { removeFeed } from "../redux/feedSlice";
import { removeConnections } from "../redux/connectionSlice";
import { Base_URL } from "../utils/constants";

export const Navbar=()=>{
  const navigate= useNavigate()
  const dispatch=useDispatch()
  const user= useSelector(store=>store?.user)
  
  const ConnectionHandler=async()=>{
   return navigate("/connections")
  }
  const logoutHandler=async()=>{
    try{
      await axios.post(Base_URL+"/logout",{},{withCredentials:true})
      dispatch(removeUser())
      dispatch(removeFeed())
      dispatch(removeConnections())
        return navigate("/login")
     } 
      catch(err){
         console.log(err.message)

    }
  }
    return (<div>
        <div className="navbar bg-slate-700 shadow-sm">
  <div className="flex-1">
    <Link to={"/"} className="btn btn-ghost text-xl text-white">Tinder</Link>
  </div>
 {user && <div className="flex gap-2 px-8">
    <div className="py-2 text-lg px-4 text-white">Welcome , {user?.firstName }</div> 
    <div className="dropdown dropdown-end flex items-center">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full ">
          <img className=" object-cover"
            alt="userphoto"
            src={user?.photoUrl}  />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-16 w-52 p-2 shadow">
        <li><Link to={"/profile"} className="justify-between"> Profile</Link></li>
        <li><Link to={"/connections"} onClick={ConnectionHandler}>Connections</Link></li>
        <li><Link to={"/requests"}>Requests</Link></li>
        <li><a onClick={logoutHandler}>Logout</a></li>
      </ul>
    </div>
  </div>}
</div>
    </div>)
}