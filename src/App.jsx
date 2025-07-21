// import React from 'react'
// import { RouterProvider } from "react-router-dom";
// import router from './routes';
// import Navbar from './globals/component/navbar/Navbar';
// import Footer from './globals/component/footer/Footer';
// import store from './store/store';
// import { Provider } from 'react-redux';

// const App = () => {
//   return (
//     <>
//     <Provider store={store}>
//       <Navbar/>
//     <RouterProvider router={router} />
//     <Footer/>
//     </Provider>
//     </>
//   )
// }

// export default App







// old appraoch cause new doesnot work
import React from 'react'
import store from './store/store'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/home/Home'
import Login from './pages/auth/login/Login'
import Register from './pages/auth/register/Register'
import Cart from './pages/cart/Cart'
import Navbar from './globals/component/navbar/Navbar'
import Footer from './globals/component/footer/Footer'
import { Provider } from 'react-redux'
import ProductDetails from './pages/productDetails/ProductDetails'
import CheckOut from './pages/checkout/CheckOut'
import KhaltiSuccess from './pages/khalti/KhaltiSuccess'
import UserProfile from './pages/profile/UserProfile'
import MyOrders from './pages/myOrders/MyOrders'
import OrderDetails from './pages/orderDetails/OrderDetails'
import ForgotPassword from './pages/auth/forgotPassword/ForgotPassword'
import VerifyOtp from './pages/auth/verifyOtp/VerifyOtp'
import ResetPassword from './pages/auth/resetPassword/ResetPassword'
import Toast from './toast/Toast'


// // socket integration
// import {io} from "socket.io-client"            // install socket.io-client
// export const socket = io("https://fooddeliverysystem-backend-1.onrender.com",{
//   auth:{
//     token:localStorage.getItem("token")
//   }
// })



import { io } from "socket.io-client";
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3500";

export const socket = io(SOCKET_URL, {
  auth: {
    token: localStorage.getItem("token"),
  },
});



const App = () => {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
        <Navbar/>
        <Toast/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/productDetails/:id' element={<ProductDetails/>}/>
          <Route path='/checkout' element={<CheckOut/>}/>
          <Route path='/success' element={<KhaltiSuccess/>}/>
          <Route path='/profile' element={<UserProfile/>}/>
          {/* show all your orders  */}
          <Route path='/myorders' element={<MyOrders/>}/>    
                  {/* show your details of the order */}
          <Route path='/myorder/:id' element={<OrderDetails/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>
          <Route path='/verifyotp' element={<VerifyOtp/>}/>
          <Route path='/resetpassword' element={<ResetPassword/>}/>
       
        </Routes>
        <Footer/>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App