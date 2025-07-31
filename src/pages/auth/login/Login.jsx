// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link, useNavigate } from 'react-router-dom'

// import { STATUSES } from '../../../globals/misc/statuses';
// import { loginUser } from '../../../store/authSlice';
// import toast from 'react-hot-toast';



// const Login = () => {
//   const {token,data,status} = useSelector((state)=>state.auth);  
    
  
//   const [userData,setUserData]= useState({
//     email:"",
//     password:""
//   })
  
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleChange=(e)=>{
//     const {name,value} = e.target;
//     setUserData({
//       ...userData,
//       [name]:value
//     })
//   }

//   const handleSubmit= (e)=>{
//     e.preventDefault();
//     try {
//       dispatch(loginUser(userData))
//       toast.success("User loggedin succesfully")
//        navigate("/")
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message || "An unexpected error occurred during login");    }
    
//   }



  
  
  
//   return (
   
//         <div>
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
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
//             <form action="#" onSubmit={handleSubmit}>
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
//                   <span className="mr-2 uppercase">Login</span>
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
//              <div className='mt-2 flex flex-col items-end text-red-400'>
//                <Link to="/forgotpassword">Forgot Password?</Link>
//              </div>
//              <div className="flex justify-center items-center mt-6">
//           <span className="ml-2">
//             Don't have an account?
//             <Link to="/register" className="text-xm ml-2 text-blue-500 font-semibold">
//               Register now
//             </Link>
//           </span>
//         </div>
//             </form>
//           </div>
//         </div>
        
//       </div>
//     </div>
    
//   )
// }

// export default Login







import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../../../assets/login.jpg"; // Path to your login image
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/authSlice"; // Adjust path if you don't use path aliases
import toast from "react-hot-toast"; // For notifications

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for form credentials
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // State for validation errors
  const [errors, setErrors] = useState({});

  // State for loading indicator during API call
  const [loading, setLoading] = useState(false);

  // Handle input changes and clear corresponding errors
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });

    // Clear the error for the specific field when the user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  // Client-side form validation
  const validateForm = () => {
    const newErrors = {};

    if (!credentials.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!credentials.password.trim()) {
      newErrors.password = "Password is required";
    } else if (credentials.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors); // Update errors state
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (validateForm()) { // Only proceed if validation passes
      setLoading(true); // Set loading to true while waiting for API response
      try {
        // Dispatch the loginUser async thunk
        // .unwrap() is used to throw the error from the thunk,
        // allowing the catch block to handle it.
        await dispatch(loginUser(credentials)).unwrap();
        toast.success("Login successful!"); // Show success toast
        navigate("/"); // Redirect to home page on successful login
      } catch (error) {
        console.error("Login Error:", error); // Log the detailed error
        // Show an error toast with a user-friendly message
        toast.error(error.message || "Login failed. Please check your credentials.");
      } finally {
        setLoading(false); // Always set loading to false after the operation
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-4xl">
        <div className="md:flex">
          {/* Left side - Image and Welcome Text */}
          <div className="md:w-1/2 relative h-64 md:h-auto">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat relative overflow-hidden"
              style={{
                backgroundImage: `url(${LoginImage})`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-xl font-bold mb-2">Welcome Back!</h2>
              <p className="text-sm">Book your appointment with ease.</p>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="md:w-1/2 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Login</h2>
              <div className="h-1 w-16 bg-[#1F2B6C] rounded-full"></div> {/* Decorative line */}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F2B6C] transition-all ${
                    errors.email ? "border-red-500" : "border-gray-300" // Red border on error
                  }`}
                  placeholder="Enter your email"
                  autoComplete="email" // For browser autofill
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p> // Display email error
                )}
              </div>

              {/* Password Input Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"} // Toggle type based on showPassword state
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F2B6C] transition-all ${
                      errors.password ? "border-red-500" : "border-gray-300" // Red border on error
                    }`}
                    placeholder="Enter your password"
                    autoComplete="current-password" // For browser autofill
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? "Hide password" : "Show password"} // Accessibility label
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        ></path>
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p> // Display password error
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link
                  to="/forgot-password" 
                  className="text-sm text-[#1F2B6C] hover:text-[#1F2B6C]/80 font-medium"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading} // Disable button when loading
                className="w-full bg-[#1F2B6C] text-white py-2 px-4 rounded-lg hover:bg-[#1F2B6C]/90 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : "Login"} {/* Button text changes based on loading state */}
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="mt-6 text-center text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup" 
                className="text-[#1F2B6C] hover:text-[#1F2B6C]/80 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;