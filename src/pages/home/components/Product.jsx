import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../store/productSlice";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL
  const navigate = useNavigate()
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

  const { data: products, status,searchTerm } = useSelector((state) => state.product); // from initialState productSlice, useSelecter for accessing , state for store and product is there. Here searchTerm to search fetchedProducts by filtering through name, description
  console.log(products);
  
  useEffect(() => {
    dispatch(fetchProducts()); //Triggers the async fetch when the component mounts
  }, [dispatch]);


  if (status == "loading") {
    return <h1>loading...</h1>;
  }

  if (status == "error") {
    return <h1>Something went wrong!</h1>;
  }


  // filtered to search fetchproducts by name,description (see hero.jsx for search logic and redux productSlice searchTerm)
  const filteredSeearchTerm = products?.filter((prod)=>prod.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.productDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod._id.toLowerCase().includes(searchTerm.toLowerCase()))

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
             
              {filteredSeearchTerm && filteredSeearchTerm.length > 0 && filteredSeearchTerm?.map((product) => {
                return (
                  <div
                    key={product._id}
                    onClick={()=>navigate(`/productDetails/${product._id}`)}
                    className=" cursor-pointer my-6 w-95 transform overflow-hidden  bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <img
                      className="h-48 w-full object-cover object-center"
                      // src={
                      //   product.productImage
                      //     ? product.productImage
                      //     : "https://images.unsplash.com/photo-1674296115670-8f0e92b1fddb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                      // }

                      src={
                          product.productImage &&
                          product.productImage.length > 0
                            ? `${apiUrl}${product.productImage[0]}`
                            : "https://images.unsplash.com/photo-1674296115670-8f0e92b1fddb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        } 
                      alt={product.productName || "Product Image"}
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


    //  <div>
    //   <div className="relative w-full ">
    //     <div className="relative bg-white-50 ">
    //       <div className="mx-auto max-w-2xl px-4  lg:max-w-7xl lg:px-8">
    //         <h1 className="text-2xl py-8 font-bold text-yellow-900 md:text-3xl lg:w-10/12">
    //           Our Popular Product
    //         </h1>

    //         <div className="flex flex-wrap justify-between">
    //           {productsToDisplay.length > 0 ? ( // Check if there are products to display
    //             productsToDisplay.map((product) => {
    //               return (
    //                 <div
    //                   key={product._id}
    //                   onClick={() => navigate(`/productDetails/${product._id}`)}
    //                   className=" cursor-pointer my-6 w-95 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg"
    //                 >
    //                   <img
    //                     className="h-48 w-full object-cover object-center"
    //                     src={
    //                       product.productImage
    //                         ? product.productImage
    //                         : "https://images.unsplash.com/photo-1674296115670-8f0e92b1fddb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    //                     }
    //                     alt="Product Image"
    //                   />
    //                   <div className="p-4">
    //                     <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
    //                       {product.productName}
    //                     </h2>
    //                     <p className="mb-2 text-base dark:text-gray-300 text-gray-700">
    //                       {product.productDescription}
    //                     </p>
    //                     <div className="flex items-center justify-between">
    //                       <div className="flex items-center">
    //                         <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
    //                           Rs: {product.productPrice}
    //                         </p>
    //                         <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">
    //                           $25.00
    //                         </p>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               );
    //             })
    //           ) : (
    //             <p className="text-center w-full py-10 text-gray-600">No products found matching your search.</p>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Product;
