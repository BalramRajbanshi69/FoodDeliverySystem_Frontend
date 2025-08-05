import React from 'react'
import { APIAuthenticated } from '../../http'
import { useState } from 'react'
import Loading from '../../globals/loader/Loading'
import { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { emptyCart } from '../../store/cartSlice'
import { useNavigate } from 'react-router-dom'

const KhaltiSuccess = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const queryParams =new URLSearchParams(location.search)
  const pidx = queryParams.get("pidx")
  const [loading,setLoading] = useState(true)

  const verifyPidx = async()=>{
    try {
      const response = await APIAuthenticated.post("/payment/verifypidx/",{pidx})
      if(response.status === 200){
        setLoading(false)
        alert(response.data.message)
        dispatch(emptyCart())                   // clear cart from state too
        window.location.href = "/"
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{          // first time mount
    verifyPidx()
  },[])

  if(loading){
    return (
      <Loading status="Verifying"/>
    )
  }else{
    return (
      <Loading status ="Verified"/>
    )
  }
}

export default KhaltiSuccess


