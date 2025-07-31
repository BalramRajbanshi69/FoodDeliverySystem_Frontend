import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { STATUSES } from "../globals/misc/statuses";
import { API, APIAuthenticated } from "../http";






const authSlice = createSlice({
    name:"auth",
    initialState:{
        data:[],
        status: STATUSES.SUCCESS,
        token:"",
        forgotPasswordData : {
        email : null, 
        status : STATUSES.LOADING
       }

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
        },
        logOut(state,action){                    // set logOut to show register and login after clear/remove token
            state.data = [],                       // set data to empty, token to be null and status to be success logout
            state.token = null,
            state.status = STATUSES.SUCCESS
        },
        setEmail(state,action){
        state.forgotPasswordData.email = action.payload
       },
       setForgotPasswordDataStatus(state,action){
        state.forgotPasswordData.status = action.payload
       }
    }
})


export const {setUser,setStatus,setToken,logOut,setEmail,setForgotPasswordDataStatus} = authSlice.actions
export default authSlice.reducer



// thunk middlware 
// register

export function registerUser(data){
    return async function registerUserThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await API.post("/auth/register",data) 
            dispatch(setStatus(STATUSES.SUCCESS));
           return response.data
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
            throw new Error(
        error.response?.data?.message || "An unexpected error occurred during registration"
      );
            
        }

    }
}



// login thunk middleware

export function loginUser(data){
    return async function loginUserThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.post("/auth/login",data)
             dispatch(setUser(response.data.data));               // set user data for login 
            dispatch(setToken(response.data.token));               // here see the backend login route code token is saved in token:token so response.data.token   && if data:token then response.data.token
            dispatch(setStatus(STATUSES.SUCCESS));  
            localStorage.setItem("token",response.data.token)                    // after suucessfull login setItem token in localStorage; response.data.token from response.data and token from backend
            // OR 
            // if(response.status === 200 && response.data.token){
            //     localStorage.setItem("token",response.data.token)                    // after suucessfull login setItem token in localStorage; response.data.token from response.data and token from backend
            // } 
            return response.data
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR))
            throw new Error(
        error.response?.data?.msg || "An unexpected error occurred during login"
      );
        }
    }
}


// forgot password
export function forgotPassword(data){
    return async function forgotPasswordThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIAuthenticated.post("auth/forgotPassword/",data)
            dispatch(setEmail(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}



//verify otp
export function verifyotp(data){
    return async function verifyotpThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIAuthenticated.post("auth/verifyOtp/",data)
            // dispatch(setUser(response.data.data))
            dispatch(setEmail(data.email))
            dispatch(setForgotPasswordDataStatus(STATUSES.SUCCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}




















