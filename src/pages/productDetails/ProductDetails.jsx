import React, { useEffect } from 'react'

import Review from './component/review/Review'
import Product from './component/product/Product'
import { useParams } from "react-router-dom";


const ProductDetails = () => {
  const {id} = useParams();   

  return (
    <div>
        <Product id={id}/>
        <Review/>
    </div>
  )
}

export default ProductDetails