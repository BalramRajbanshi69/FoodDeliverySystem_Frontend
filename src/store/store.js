import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./cartSlice"
import productReducer from "./productSlice"
import authReducer from "./authSlice"
const store = configureStore({
    reducer:{
        cart:cartReducer,             // state.cart  here, state represent whole store and cart  is the name of the reducer cart
        product:productReducer ,       // state.product 
        auth:authReducer
    }
})

export default store;






