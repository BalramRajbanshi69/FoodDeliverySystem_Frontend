
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import {Link, useNavigate} from "react-router-dom"
// import { registerUser } from '../../../store/authSlice'
// import { STATUSES } from '../../../globals/misc/statuses'
// import toast from 'react-hot-toast'
// const Register = () => {
//   const dispatch = useDispatch();
// const {status}= useSelector((state)=>state.auth);  
// // console.log(data);

//   const navigate = useNavigate();
//   const [userData,setUserData] = useState({
//     username:"",
//     email:"",
//     phoneNumber:"",
//     password:""
//   })


//   const handleChange = (e)=>{
//     const {name,value} = e.target
//     setUserData({
//       ...userData,
//       [name]:value
//     })
//   }


 


// const handleSubmit = (e)=>{
//   e.preventDefault();
//  try {
//     dispatch(registerUser(userData));
//    if (status === STATUSES.SUCCESS) {
//     toast.success("User registered successfully")
//      return navigate("/login");
//     }
//     if (status === STATUSES.ERROR) {
//       return;
//     }
    
//  } catch (error) {
//    if (error.message === "User already exists") {
//           toast.error("User with this email already exists");
//         } else {
//           toast.error(error.message || "An unexpected error occurred during registration");
//         }
//  }

// }



//   return (
//     <div>
      
//       <div className="min-h-screen py-20 flex flex-col items-center justify-center bg-gray-100">
//         <div
//           className="
//             flex flex-col
//             bg-white
//             shadow-md
//             px-4
//             sm:px-6
//             md:px-8
//             lg:px-10
//             py-8
//             rounded-3xl
//             w-100
//             max-w-md
//           "
//         >
//           <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
//             Welcome Back
//           </div>
//           <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
//             Enter your credentials to access your account
//           </div>

//           <div className="mt-10">
//             <form  onSubmit={handleSubmit}>
//               <div className="flex flex-col mb-6">
//                 <label
//                   htmlFor="username"
//                   className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
//                 >
//                   userName:
//                 </label>
//                 <div className="relative">
//                   <div
//                     className="
//                       inline-flex
//                       items-center
//                       justify-center
//                       absolute
//                       left-0
//                       top-0
//                       h-full
//                       w-10
//                       text-gray-400
//                     "
//                   >
//                     <span>
//                       <i className="fas fa-lock text-blue-500"></i>
//                     </span>
//                   </div>

//                   <input
//                     id="username"
//                     type="text"
//                     name="username"
//                     onChange={handleChange}
//                     value={userData.username}
                    
//                     className="
//                       text-sm
//                       placeholder-gray-500
//                       pl-10
//                       pr-4
//                       rounded-2xl
//                       border border-gray-400
//                       w-full
//                       py-2
//                       focus:outline-none focus:border-blue-400
//                     "
//                     placeholder="Enter your username"
//                   />
//                 </div>
//               </div>
//               <div className="flex flex-col mb-5">
//                 <label
//                   htmlFor="email"
//                   className="mb-1 text-xs tracking-wide text-gray-600"
//                 >
//                   E-Mail Address:
//                 </label>
//                 <div className="relative">
//                   <div
//                     className="
//                       inline-flex
//                       items-center
//                       justify-center
//                       absolute
//                       left-0
//                       top-0
//                       h-full
//                       w-10
//                       text-gray-400
//                     "
//                   >
//                     <i className="fas fa-at text-blue-500"></i>
//                   </div>

//                   <input
//                     id="email"
//                     type="email"
//                     name="email"
//                     value={userData.email}
//                     onChange={handleChange}
              
//                     className="
//                       text-sm
//                       placeholder-gray-500
//                       pl-10
//                       pr-4
//                       rounded-2xl
//                       border border-gray-400
//                       w-full
//                       py-2
//                       focus:outline-none focus:border-blue-400
//                     "
//                     placeholder="Enter your email"
//                   />
//                 </div>
//               </div>
//                <div className="flex flex-col mb-5">
//                 <label
//                   htmlFor="phoneNumber"
//                   className="mb-1 text-xs tracking-wide text-gray-600"
//                 >
//                   phoneNumber:
//                 </label>
//                 <div className="relative">
//                   <div
//                     className="
//                       inline-flex
//                       items-center
//                       justify-center
//                       absolute
//                       left-0
//                       top-0
//                       h-full
//                       w-10
//                       text-gray-400
//                     "
//                   >
//                     <i className="fas fa-at text-blue-500"></i>
//                   </div>

//                   <input
//                     id="phoneNumber"
//                     type="number"
//                     name="phoneNumber"
//                     onChange={handleChange}
//                     value={userData.phoneNumber}
//                     className="
//                       text-sm
//                       placeholder-gray-500
//                       pl-10
//                       pr-4
//                       rounded-2xl
//                       border border-gray-400
//                       w-full
//                       py-2
//                       focus:outline-none focus:border-blue-400
//                     "
//                     placeholder="Enter your phoneNumber"
//                   />
//                 </div>
//               </div>
//               <div className="flex flex-col mb-6">
//                 <label
//                   htmlFor="password"
//                   className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
//                 >
//                   Password:
//                 </label>
//                 <div className="relative">
//                   <div
//                     className="
//                       inline-flex
//                       items-center
//                       justify-center
//                       absolute
//                       left-0
//                       top-0
//                       h-full
//                       w-10
//                       text-gray-400
//                     "
//                   >
//                     <span>
//                       <i className="fas fa-lock text-blue-500"></i>
//                     </span>
//                   </div>

//                   <input
//                     id="password"
//                     type="password"
//                     name="password"
//                     value={userData.password}
                    
//                     onChange={handleChange}
//                     className="
//                       text-sm
//                       placeholder-gray-500
//                       pl-10
//                       pr-4
//                       rounded-2xl
//                       border border-gray-400
//                       w-full
//                       py-2
//                       focus:outline-none focus:border-blue-400
//                     "
//                     placeholder="Enter your password"
//                   />
//                 </div>
//               </div>

              

//               <div className="flex w-full">
//                 <button
//                   type="submit"
//                   className="
//                     flex
//                     mt-2
//                     items-center
//                     justify-center
//                     focus:outline-none
//                     text-white text-sm
//                     sm:text-base
//                     bg-blue-500
//                     hover:bg-blue-600
//                     rounded-2xl
//                     py-2
//                     w-full
//                     transition
//                     duration-150
//                     ease-in
//                   "
//                 >
//                   <span className="mr-2 uppercase">Register</span>
//                   <span>
//                     <svg
//                       className="h-6 w-6"
//                       fill="none"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </span>
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//         <div className="flex justify-center items-center mt-6">
//           <span className="ml-2">
//             Already registered?
//             <Link to="/login" className="text-xs ml-2 text-blue-500 font-semibold">
//               Login
//             </Link>
//           </span>
//         </div>
//       </div>
    
//     </div>
//   )
// }

// export default Register








import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../store/authSlice";
import { STATUSES } from "../../../globals/misc/statuses"; 
import toast from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const requirements = [];

    if (password.length < minLength)
      requirements.push(`at least ${minLength} characters`);
    if (!hasUpperCase) requirements.push("an uppercase letter");
    if (!hasLowerCase) requirements.push("a lowercase letter");
    if (!hasNumbers) requirements.push("a number");
    if (!hasSpecialChars) requirements.push("a special character");

    return {
      isValid: requirements.length === 0,
      requirements,
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!userData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (userData.username.trim().length < 2) {
      newErrors.username = "Username must be at least 2 characters";
    }

    if (!userData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Email is invalid";
    }

     if (!userData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^(98|97)\d{8}$/.test(userData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must start with 98 or 97 and be 10 digits long";
    }

    if (!userData.password) {
      newErrors.password = "Password is required";
    } else {
      const { isValid, requirements } = validatePassword(userData.password);
      if (!isValid) {
        newErrors.password = `Password must contain ${requirements.join(
          ", "
        )}.`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await dispatch(registerUser(userData));
        if (status === STATUSES.SUCCESS) {
          toast.success("User registered successfully");
          navigate("/login");
        } else if (status === STATUSES.ERROR) {

          toast.error("An error occurred during registration. Please try again.");
        }
      } catch (error) {
        if (error.message === "User already exists") {
          toast.error("User with this email already exists");
        } else {
          toast.error(
            error.message || "An unexpected error occurred during registration"
          );
        }
      }
    }
  };

  return (
    <div>
      <div className="min-h-screen py-20 flex flex-col items-center justify-center bg-gray-100">
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
          <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
            Welcome Back
          </div>
          <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
            Enter your credentials to access your account
          </div>

          <div className="mt-10">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="username"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Username:
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
                    <span>
                      <i className="fas fa-user text-blue-500"></i> 
                    </span>
                  </div>

                  <input
                    id="username"
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={userData.username}
                    className={`
                      text-sm
                      placeholder-gray-500
                      pl-10
                      pr-4
                      rounded-2xl
                      border 
                      w-full
                      py-2
                      focus:outline-none focus:border-blue-400
                      ${errors.username ? "border-red-500" : "border-gray-400"}
                    `}
                    placeholder="Enter your username"
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.username}
                  </p>
                )}
              </div>

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
                    value={userData.email}
                    onChange={handleChange}
                    className={`
                      text-sm
                      placeholder-gray-500
                      pl-10
                      pr-4
                      rounded-2xl
                      border 
                      w-full
                      py-2
                      focus:outline-none focus:border-blue-400
                      ${errors.email ? "border-red-500" : "border-gray-400"}
                    `}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="flex flex-col mb-5">
                <label
                  htmlFor="phoneNumber"
                  className="mb-1 text-xs tracking-wide text-gray-600"
                >
                  Phone Number:
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
                    <i className="fas fa-phone text-blue-500"></i>{" "}
                  </div>

                  <input
                    id="phoneNumber"
                    type="number"
                    name="phoneNumber"
                    onChange={handleChange}
                    value={userData.phoneNumber}
                    className={`
                      text-sm
                      placeholder-gray-500
                      pl-10
                      pr-4
                      rounded-2xl
                      border 
                      w-full
                      py-2
                      focus:outline-none focus:border-blue-400
                      ${
                        errors.phoneNumber ? "border-red-500" : "border-gray-400"
                      }
                    `}
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div className="flex flex-col mb-6">
                <label
                  htmlFor="password"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Password:
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
                    <span>
                      <i className="fas fa-lock text-blue-500"></i>
                    </span>
                  </div>

                  <input
                    id="password"
                    type="password" 
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    className={`
                      text-sm
                      placeholder-gray-500
                      pl-10
                      pr-4
                      rounded-2xl
                      border 
                      w-full
                      py-2
                      focus:outline-none focus:border-blue-400
                      ${errors.password ? "border-red-500" : "border-gray-400"}
                    `}
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password ? (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </p>
                ) : isPasswordFocused ? (
                  <p className="text-gray-500 text-xs mt-1">
                    Password must be at least 8 characters long and contain an
                    uppercase letter, a lowercase letter, a number, and a
                    special character.
                  </p>
                ) : null}
              </div>

              <div className="flex w-full">
                <button
                  type="submit"
                  className="
                    flex
                    mt-2
                    items-center
                    justify-center
                    focus:outline-none
                    text-white text-sm
                    sm:text-base
                    bg-blue-500
                    hover:bg-blue-600
                    rounded-2xl
                    py-2
                    w-full
                    transition
                    duration-150
                    ease-in
                  "
                >
                  <span className="mr-2 uppercase cursor-pointer">Register</span>
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-center items-center mt-6">
          <span className="ml-2">
            Already registered?
            <Link to="/login" className="text-xs ml-2 text-blue-500 font-semibold">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;