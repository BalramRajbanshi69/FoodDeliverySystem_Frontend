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

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
        <Footer/>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App