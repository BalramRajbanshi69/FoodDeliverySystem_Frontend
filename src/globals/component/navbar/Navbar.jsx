import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../../store/authSlice";
import { useEffect } from "react";
import { fetchCartItems } from "../../../store/cartSlice";
import { useState } from "react";

export default function Navbar() {
  const {items} = useSelector((state) => state.cart); // state will take whole store items but we need only name of state cart name from cartSlice name:"cart"
  
  // useSelector is a React-Redux hook that allows you to access data from the Redux store in your React component.
  //The function you pass to useSelector receives the entire Redux store state as its argument.
  //state.cart accesses the cart slice of your Redux store (as defined in your store setup).

  const { data: user } = useSelector((state) => state.auth); // you can directly use data ; here data is stored in user for simple understanding as instance
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = ()=>{
    // empty the date from auth store
    dispatch(logOut())
    // remove/clear token from localStorage
    localStorage.removeItem("token")
    navigate("/login")
  }

  // first time render
  // since we wanted to show the user added to cart lenght in navbar cart , we need to fetch them here
  // why use dispatch as dependency => Ensures latest function, avoids lint warnings, future-proof code
  useEffect(()=>{
    dispatch(fetchCartItems())
  },[dispatch])



  return (
    <nav className="fixed  z-10 w-full bg-white md:absolute md:bg-transparent">
      <div className=" container mx-auto max-w-2xl px-4  lg:max-w-7xl lg:px-8">
        {/* <div className="container px-2 m-auto md:px-12 lg:px-7"> */}
        <div className="flex flex-wrap items-center justify-between py-3 gap-6 md:py-4 md:gap-0">
          <div className="w-full px-6 flex justify-between lg:w-max md:px-0">
            <Link
              to="/"
              aria-label="logo"
              className="flex space-x-2 items-center"
            >
              <span className="text-2xl font-bold text-yellow-900">
                Digital<span className="text-yellow-700"> Food</span>
              </span>
            </Link>

            <button
              aria-label="humburger"
              id="hamburger"
              className="relative w-10 h-10 -mr-2 lg:hidden"
            >
              <div
                aria-hidden="true"
                id="line"
                className="inset-0 w-6 h-0.5 m-auto rounded bg-yellow-900 transtion duration-300"
              ></div>
              <div
                aria-hidden="true"
                id="line2"
                className="inset-0 w-6 h-0.5 mt-2 m-auto rounded bg-yellow-900 transtion duration-300"
              ></div>
            </button>
          </div>

          <div className="hidden w-full lg:flex flex-wrap justify-end items-center space-y-6 p-6 rounded-xl bg-white md:space-y-0 md:p-0 md:flex-nowrap md:bg-transparent lg:w-7/12">
            <div className="text-gray-600 lg:pr-4">
              <ul className="space-y-6 tracking-wide font-medium text-sm md:flex md:space-y-0">
                   {
                    (user?.length > 0 || localStorage.getItem("token"))  && 
                <li>
                       <Link
                    to="profile"
                    className="block md:px-4 transition hover:text-yellow-700"
                  >
                    <span>Profile</span>
                  </Link> 
                </li>
                   }
                <li>
                  {/* show only cart link if cart length is greater than 0 ; if zero dont show ; here items from cartSlice */}
                 { items.length !== 0 && (
                    <Link
                    to="/cart"
                    className="block md:px-4 transition hover:text-yellow-700"
                  >
                    <span>
                      Cart <sup>{items.length}</sup>
                    </span>
                  </Link>
                  )}
                </li>
              </ul>
            </div>

            <div className="w-full space-y-2 border-yellow-200 lg:space-y-0 md:w-max lg:border-l">
              {/* If the user is NOT logged in: user.length == 0 (no user data in Redux) AND there is no token in localStorage ("", null, or undefined) THEN: Show the Register and Login buttons. If the user IS logged in:
 user.length != 0 (user data exists) OR there is a token in localStorage THEN: Show the Logout button. */}

              {user.length == 0 &&
              (localStorage.getItem("token") == "" ||
                localStorage.getItem("token") == null ||
                localStorage.getItem("token") == undefined) ? (
                <>
                  <button
                    type="button"
                    title="Start buying"
                    className="w-full py-3 px-6 text-center rounded-full transition active:bg-yellow-200 focus:bg-yellow-100 sm:w-max"
                  >
                    <span className="block text-yellow-800 font-semibold text-sm">
                      <Link to="/register">Register</Link>
                    </span>
                  </button>
                  <button
                    type="button"
                    title="Start buying"
                    className="w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max"
                  >



                    <span className="block text-yellow-900 font-semibold text-sm">
                      <Link to="/login">Login</Link>
                    </span>


                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleLogOut}
                    type="button"
                    title="Start buying"
                    className="w-full cursor-pointer py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max"
                  >
                    <span className="block text-yellow-900 font-semibold text-sm">
                      Log Out
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
