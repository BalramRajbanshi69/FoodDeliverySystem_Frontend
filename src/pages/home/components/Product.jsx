import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../../store/cartSlice";
import { fetchProducts } from "../../../store/productSlice";

const Product = () => {
  // old approach
  // const [products,setProducts] = useState([]);
  // const fetchProducts = async()=>{
  //   const response = await axios.get("http://localhost:3500/api/products");
  //   if(response.status === 200){
  //     setProducts(response.data.data)
  //   }
  // }
  // useEffect(()=>{
  //   fetchProducts()
  // },[])



  // new approach 
  // using thunk middleware aysnchronous api calling
  const dispatch = useDispatch();
  //  useSelector is a React-Redux hook that lets you access data from the Redux store in your component.
  // (state) => state.product selects the product slice from your Redux store.
  // data: products means:
// Get the data property from state.product and rename it to products in this component. 
// you can directly use data but there use data instead of products.map, use data

  const { data: products, status } = useSelector((state) => state.product); // from initialState productSlice, useSelecter for accessing , state for store and product is there
  useEffect(() => {
    dispatch(fetchProducts()); //Triggers the async fetch when the component mounts
  }, []);

  const addToCart = (product) => {
    dispatch(add(product));
  };

  if (status == "loading") {
    return <h1>loading...</h1>;
  }

  if (status == "error") {
    return <h1>Something went wrong!</h1>;
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
              {products.map((product) => {
                return (
                  <div
                    key={product._id}
                    className=" my-6 w-95 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <img
                      className="h-48 w-full object-cover object-center"
                      src={
                        product.productImage
                          ? product.productImage
                          : "https://images.unsplash.com/photo-1674296115670-8f0e92b1fddb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                      }
                      alt="Product Image"
                    />
                    <div className="p-4">
                      <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
                        {product.productName}
                      </h2>
                      <p className="mb-2 text-base dark:text-gray-300 text-gray-700">
                        {product.productDescription}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
                            Rs: {product.productPrice}
                          </p>
                          <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">
                            $25.00
                          </p>
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className=" px-4 py-2 cursor-pointer font-bold text-white bg-yellow-500 rounded hover:bg-yellow-600"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
