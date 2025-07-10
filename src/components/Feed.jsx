import { useEffect } from "react";
import axios from "axios";
import { addFeed } from "../redux/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { UserCard } from "./UserCard";

export const Feed=()=>{
    const feed= useSelector(store=>store?.feed)
    const dispatch= useDispatch()
    const feedHandler=async()=>{
       if(feed) return;
       try{ const res= await axios.get("http://localhost:5566/user/feed",{ withCredentials: true })
        dispatch(addFeed(res.data))}
        catch(err){
            console.error(err.message)
        }
    }
    useEffect(()=>{
        feedHandler()
    },[])
    return (<div>{(feed?.length>0) ?  <UserCard fields={feed[0]} />:"No feed user"}</div>)
}