import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { add, remove } from "../../../store/cartSlice";

const Product = () => {
  const [products,setProducts] = useState([]);
  const dispatch = useDispatch()

  const fetchProducts = async()=>{
    const response = await axios.get("http://localhost:3500/api/products");
    if(response.status === 200){
      setProducts(response.data.data)
    }
  }

  useEffect(()=>{
    fetchProducts();
  },[]); 


  const addToCart = (product)=>{
     dispatch(add(product))
  }
  

  const removeFromCart = (product)=>{
    dispatch(remove({id:product._id}))
  }
       
  return (
    <div>
      <div className="relative w-full ">
        <div className="relative bg-white-50 ">
          <div className="mx-auto max-w-2xl px-4  lg:max-w-7xl lg:px-8">
            <h1 className="text-2xl py-8 font-bold text-yellow-900 md:text-3xl lg:w-10/12">
              Our Popular Product
            </h1>
          
          
            {/* make a grid such that start from page matching to it */}
          <div className="flex flex-wrap justify-between">  
            {products.map((product)=>{
              return (
          <div key={product._id} className=" my-6 w-95 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
            <img
              className="h-48 w-full object-cover object-center"
              src={product.productImage ? product.productImage : "https://images.unsplash.com/photo-1674296115670-8f0e92b1fddb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"}
              alt="Product Image"
            />
            <div className="p-4">
              <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
              {product.productName}
              </h2>
              <p className="mb-2 text-base dark:text-gray-300 text-gray-700">
                {product.productDescription}
              </p>
              <div className="flex items-center ">
                <div className="flex items-center">
                <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
                  Rs: {product.productPrice}
                </p>
                <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">
                  $25.00
                </p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4 ">
                <button onClick={()=>addToCart(product)} className=" p-4  font-bold text-white bg-yellow-500 rounded hover:bg-yellow-600">Add to Cart</button>
                <button onClick={()=>removeFromCart(product)} className=" p-4 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-600">Remove From Cart</button>
                </div>
            </div>
          </div>
              )
            })}
          </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Product;
