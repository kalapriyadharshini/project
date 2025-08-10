import { useState } from 'react'
import './App.css'
import CustomNavbar from './components/CustomNavbar'
import Home from './Pages/Home'
import { Routes, Route } from 'react-router-dom'
import Aboutus from './Pages/Aboutus'
import Track from './Pages/Track'
import Contactus from './Pages/Contactus'
import Terms from './Pages/Terms'
import Privacy from './Pages/Privacy'
import Shipping from './Pages/Shipping'
import CategoryPage from './components/CategoryPage'
import SubcategoryPage from './components/SubcategoryPage'
import Footer from './components/Footer'
import ProductDetails from './components/ProductDetails'

import OrderSummaryPage from './components/OrderSummaryPage'
import OrderSuccessPage from './components/OrderSuccessPage'
import Profile from './Pages/Profile'
import ViewPage from './components/ViewPage'
import Login from './components/Login'
import Checkout from './components/Checkout'
// import Register from './components/Register'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './redux/userSlice';

import Wishlist from './Pages/Wishlist'
import Orders from './Pages/Orders'
import ScrollToTop from './components/ScrollToTop'
import SearchResults from './Pages/SearchResults'
import GuidesPage from './Pages/GuidesPage'




function App() {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch();

    useEffect(() => {
  const storedUser = localStorage.getItem("userInfo");
  if (storedUser) {
    dispatch(setUser(JSON.parse(storedUser)));
  }
}, [dispatch]);

  return (
    <>  
        <CustomNavbar />
          <ScrollToTop />
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
           <Route path="/wishlist" element={<Wishlist />} />
           <Route path="/guides" element={<GuidesPage />} />
           <Route path="/search" element={<SearchResults />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/track" element={<Track />} />
          <Route path="/contact" element={<Contactus />} />
          <Route path="/term" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/subcategory/:categoryName" element={<SubcategoryPage />} /> 
          <Route path="/cart" element={<ViewPage />} />  
          <Route path="/product/:name" element={<ProductDetails />} />
          {/* <Route path="/checkout" element={<CheckoutAuthPage />} /> */}
          <Route path="/order-summary" element={<OrderSummaryPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
           {/* <Route path="/login" element={<CheckoutAuthPage />} /> */}
          <Route path="/checkout" element={<Checkout />} />
          {/* <Route path="/summary" element={<SummaryPage />} /> */}


       </Routes>
       <Footer />
    </>
  )
}
export default App

