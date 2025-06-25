import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { STATUSES } from "../globals/misc/status";




const productSlice = createSlice({
    name:"product",
    initialState:{
        data:[],
        status: STATUSES.SUCCESS
    },
    reducers:{                      // reducers are pure and synchronous , so no api calls
        setProducts(state,action){
            state.data = action.payload
        },
        setStatus(state,action){
            state.status = action.payload
        }
    }
})


export const {setProducts,setStatus} = productSlice.actions
export default productSlice.reducer



//You want to fetch products asynchronously from your backend.
//Redux reducers must be pure and synchronous (no API calls inside reducers).
//To handle async logic (like API calls), you use Redux Thunk middleware.
// new approach using Thunk middleware

// fetchProducts is an async thunk that:
// Dispatches setStatus(LOADING) to show a loading state.
// Makes an API call to fetch products.
// On success, dispatches setProducts and setStatus(SUCCESS).
// On error, dispatches setStatus(ERROR).
export function fetchProducts(){
    return async function fetchProductThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await axios.get("http://localhost:3500/api/products");
            dispatch(setProducts(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR))
            
        }
    }
}