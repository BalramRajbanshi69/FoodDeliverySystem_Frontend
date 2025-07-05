import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { STATUSES } from "../globals/misc/statuses";
import { API } from "../http";





const productSlice = createSlice({
    name:"product",
    initialState:{
        data:[],                      // getting all the products 
        status: STATUSES.SUCCESS,
        selectedProductDetails:{},            // getting selected single product details
        searchTerm:""                     // search hero home page fetched product by search name,_id,...
    },
    reducers:{                      // reducers are pure and synchronous , so no api calls
        setProducts(state,action){
            state.data = action.payload
        },
        setStatus(state,action){
            state.status = action.payload
        },
        setSelectedProductDetails(state,action){                      // single selected product details
            state.selectedProductDetails = action.payload
        },
        setSearchTerm(state,action){
            state.searchTerm = action.payload
        }
    }
})


export const {setProducts,setStatus,setSelectedProductDetails,setSearchTerm} = productSlice.actions
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
            const response = await API.get("/products");
            dispatch(setProducts(response.data.data.reverse()))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR))
            
        }
    }
}




// single selected product details

export function fetchSingleSelectedProductDetails(productId){
    return async function fetchSingleSelectedProductDetailsThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
          const response = await API.get(`/products/${productId}`)        // getting single product throught id backend
          dispatch(setSelectedProductDetails(response.data.data))      // from reducers
          dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            // console.log(error);
            dispatch(setStatus(STATUSES.ERROR))  
        }
    }
}