import {createSlice} from "@reduxjs/toolkit";

export const feedSlice= createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=>{
            return action.payload
        },
        removeFeed:(state,action)=>{
            return null
        },
        removeSingleFeed:(state,action)=>{
            const newarr= state.filter(r=>r._id!==action.payload)
            return newarr
        }
    }
})
export const {addFeed,removeFeed,removeSingleFeed}= feedSlice.actions
export default feedSlice.reducer