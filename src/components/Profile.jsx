
import { useSelector } from "react-redux"
import { Editprofile } from "./EditProfile"

export const Profile=()=>{
    const user= useSelector(store=>store?.user)
    console.log(user)
    return(<div>
       <Editprofile user={user}/>
    </div>)
}