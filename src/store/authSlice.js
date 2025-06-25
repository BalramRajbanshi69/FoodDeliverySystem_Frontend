import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { STATUSES } from "../globals/misc/status";





const authSlice = createSlice({
    name:"auth",
    initialState:{
        data:[],
        status: STATUSES.SUCCESS,
        token:""
    },
    reducers:{                      // reducers are pure and synchronous , so no api calls
        setUser(state,action){                       // register first set user
            state.data = action.payload
        },
        setStatus(state,action){
            state.status = action.payload
        },
        setToken(state,action){                     // login for setToken as it data is set to token
            state.token = action.payload 
        }
    }
})


export const {setUser,setStatus,setToken} = authSlice.actions
export default authSlice.reducer



// thunk middlware 
// register

export function registerUser(data){
    return async function registerUserThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await axios.post("http://localhost:3500/api/auth/register",data)
            dispatch(setUser(response.data.data));
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
        }

    }
}



// login thunk middleware

export function loginUser(data){
    return async function loginUserThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await axios.post("http://localhost:3500/api/auth/login",data)
            
            dispatch(setToken(response.data.token));               // here see the backend login route code token is saved in token:token so response.data.token   && if data:token then response.data.token
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}























