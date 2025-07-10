import { createSlice } from "@reduxjs/toolkit";



export const connectionSlice= createSlice({
    name:"connections",
    initialState:null,
    reducers:{
        addconnections:(state, action)=>{
            return action.payload
        },
        removeConnections:(state,action)=>{
            return null
        }

    }
})

export const {addconnections,removeConnections}= connectionSlice.actions;
export default connectionSlice.reducer;