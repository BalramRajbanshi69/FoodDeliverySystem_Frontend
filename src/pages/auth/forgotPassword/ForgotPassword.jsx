import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


import { Link, useNavigate } from "react-router-dom"
import { STATUSES } from "../../../globals/misc/statuses"
import { forgotPassword } from "../../../store/authSlice"

const ForgotPassword = () => {
  const [email,setEmail] = useState("")
  const navigate = useNavigate()
  const {status,data} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(forgotPassword({email}))
    if(status === STATUSES.SUCCESS){
        navigate("/verifyotp")
    }

  }
  // useEffect(()=>{
  //   if(status === STATUSES.SUCCESS){
  //       navigate("/verifyotp")
  //   }
  // },[status])
  return (

      <div>
       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
         <div
           className="
             flex flex-col
             bg-white
             shadow-md
             px-4
             sm:px-6
             md:px-8
             lg:px-10
             py-8
             rounded-3xl
             w-100
             max-w-md
           "
         >
           
 
           <div className="mt-10">
             <form onSubmit={handleSubmit}>
               <div className="flex flex-col mb-5">
                 <label
                   htmlFor="email"
                   className="mb-1 text-xs tracking-wide text-gray-600"
                 >
                   E-Mail Address:
                 </label>
                 <div className="relative">
                   <div
                     className="
                       inline-flex
                       items-center
                       justify-center
                       absolute
                       left-0
                       top-0
                       h-full
                       w-10
                       text-gray-400
                     "
                   >
                     <i className="fas fa-at text-blue-500"></i>
                   </div>
 
                   <input
                     id="email"
                     type="email"
                     name="email"
                     onChange={(e)=>setEmail(e.target.value)}
                     className="
                       text-sm
                       placeholder-gray-500
                       pl-10
                       pr-4
                       rounded-2xl
                       border border-gray-400
                       w-full
                       py-2
                       focus:outline-none focus:border-blue-400
                     "
                     placeholder="Enter your email"
                   />
                 </div>
               </div>
               
              
              <button className='mt-2 cursor-pointer flex flex-col items-center w-full rounded border-2 p-2'>
                <div>Send OTP</div>
              </button>

               <div className="flex justify-center items-center mt-4">
           <span className="ml-2">
             You don't have an account?
             <Link to="/register" className="text-xm ml-2 text-blue-500 font-semibold">
               Register now
             </Link>
           </span>
         </div>
             </form>
           </div>
         </div>
        
       </div>
     </div>
  )
}

export default ForgotPassword