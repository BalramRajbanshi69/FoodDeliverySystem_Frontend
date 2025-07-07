import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSelectedProductDetails } from "../../../../store/productSlice";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../../store/cartSlice";
import { socket } from "../../../../App";
import toast from "react-hot-toast";

const Product = ({ id: productId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProductDetails, status } = useSelector(
    (state) => state.product
  ); //first approach taken seleectedProductDetails === product , cause in console it is coming to product name from backend
  // const {product,status} = useSelector((state)=>state.product.selectedProductDetails)       //second approach state.product ; state == store, product taking product name reducer and need to take selectedProductDetails as it an object so dot .
  // second approach + use this in h2 { product?.[0].productName }
  //  if {selectedProdcutDetails:product} , first approach + then you can use this in h2  as=> product.product && product.product[0] && product.product[0].productName}  OR product.product?.[0].(any thing you wanted eg:productName,productPrice)
  const product =
    selectedProductDetails.product && selectedProductDetails.product?.[0]; // first + this

  useEffect(() => {
    dispatch(fetchSingleSelectedProductDetails(productId));
  }, []);

  // why? to check if user is logged in then give permission to add to cart  otherwise throw to login page
  const { data: user } = useSelector((state) => state.auth);
  const handleAddToCart = () => {
   
    try {
       if (
      user?.length == 0 &&
      (localStorage.getItem("token") == "" ||
        localStorage.getItem("token") == null ||
        localStorage.getItem("token") == undefined)
    ) {
      return navigate("/login");
    }
      dispatch(addToCart(productId));
    toast.success("Product added to cart successfully")
    } catch (error) {
      console.error(error);
      toast.error("failed to add products to cart")
    }
  };


  return (
    <div>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={product?.productImage}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              {/* in console, to get productName product.product[0].productName   . here product object + product arrya of [0] and accessing object with it so dot. */}
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product?.productName}
              </h2>

              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                The Catcher in the Rye
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  {/* <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg> */}
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{product?.productDescription}</p>
              <p className="leading-relaxed">
                <span className="text-gray-500">Status:</span>{" "}
                {product?.productStatus}
              </p>
              {/* <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
          <div className="flex">
            <span className="mr-3">Color</span>
            <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
            <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
            <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
          </div>
          <div className="flex ml-6 items-center">
            <span className="mr-3">Size</span>
            <div className="relative">
              <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                <option>SM</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>
        </div> */}
              <p className="leading-relaxed">
                <span className="text-gray-500">Stock Remaining:</span>{" "}
                {product?.productStockQuantity}
              </p>
              <div className="w-full border-b-1 border-gray-300 my-6"></div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  NPR: {product?.productPrice}
                </span>
                {product?.productStockQuantity > 0 ? (
                  <button
                    onClick={handleAddToCart}
                    className=" cursor-pointer flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                  >
                    Add To Cart
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    disabled
                    className="cursor-not-allowed flex ml-auto text-white bg-red-400 border- py-2 px-6 focus:outline-none rounded opacity-70 hover:bg-red-700"
                  >
                    Out of Stock{" "}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
