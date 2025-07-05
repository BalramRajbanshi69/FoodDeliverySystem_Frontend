import Hero from "./components/Hero"
import Product from "./components/Product"


export default function Home() {

  
  return (
    <>
    <Hero/>
    <Product/>

    </>
  )
}





// Home.jsx
// import React, { useState, useEffect } from "react"; // Import useEffect
// import { useSelector, useDispatch } from "react-redux"; // Import useDispatch

// import Hero from "./components/Hero";
// import Product from "./components/Product";
// import { fetchProducts } from "../../store/productSlice";

// export default function Home() {
//   const dispatch = useDispatch();
//   const { data: products, status } = useSelector((state) => state.product); // Access all products from Redux

//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     dispatch(fetchProducts()); // Fetch products when Home component mounts
//   }, [dispatch]); // Add dispatch to dependency array to avoid linting warnings

//   // Filter products based on searchTerm
//   const filteredProducts = products?.filter(
//     (prod) =>
//       prod._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       prod.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       prod.productDescription.toLowerCase().includes(searchTerm.toLowerCase())
//   );


//   return (
//     <>
//       <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//       <Product productsToDisplay={filteredProducts} status={status} /> {/* Pass filtered data and status */}
//     </>
//   );
// }