import { createSlice } from "@reduxjs/toolkit";


export const requestSlice= createSlice({
    name:"request",
    initialState:null,
    reducers:{
        addRequest:(state,action)=>{
            return action.payload
        },
        removeRequest:(state,action)=>{
            const newArr= state.filter(req=> req._id!== action.payload)
            return newArr
        }
    }
})
export const { addRequest,removeRequest}= requestSlice.actions;
export default requestSlice.reducer