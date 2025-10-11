import { useState } from 'react'
import './App.css'
// import CustomNavbar from './components/CustomNavbar'
import Home from './Pages/Home'
import { Routes, Route } from 'react-router-dom'
import Aboutus from './Pages/Aboutus'
// import Track from './Pages/Track'
import Contactus from './Pages/Contactus'
import Terms from './Pages/Terms'
import Privacy from './Pages/Privacy'
import Shipping from './Pages/Shipping'
import CategoryPage from './components/CategoryPage'
import SubcategoryPage from './components/SubcategoryPage'
// import Footer from './components/Footer'
import ProductDetails from './components/ProductDetails'
// import OrderSummaryPage from './components/OrderSummaryPage'
// import OrderSuccessPage from './components/OrderSuccessPage'
import Profile from './Pages/Profile'
import ViewPage from './components/ViewPage'
import Login from './components/Login'
// import Checkout from './components/Checkout'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './redux/userSlice';
import Wishlist from './Pages/Wishlist'
import Orders from './Pages/Orders'
import ScrollToTop from './components/ScrollToTop'
import SearchResults from './Pages/SearchResults'
import GuidesPage from './Pages/GuidesPage'
import Track from './Pages/Track'
import Checkout from './components/Checkout'
import PaymentPage from './components/PaymentPage'
// import OrderSummaryPage from './components/OrderSummaryPage'
import OrderSuccessPage from './components/OrderSuccessPage'
// import Checkout from './components/Checkout'
// import PaymentPage from './components/PaymentPage'
// import OrderSummaryPage from './components/OrderSummaryPage'
// import OrderSuccessPage from './components/OrderSuccessPage'
// import AddressPage from './components/AddressPage'
import OrderSummaryPage from './components/OrderSummaryPage'
import AddressPage from './components/AddressPage'
import AdminLayout from './admin/layout/AdminLayout'
import Dashboard from './admin/components/Dashboard'
// import Products from './admin/components/Products'
import Users from './admin/components/Users'
// import Staff from './admin/components/Staff'
// import Payment from './admin/components/Payment'
import Setting from './admin/components/Setting'
import Report from './admin/components/Report'
import Categories from './components/Categories'
import Category from './admin/components/Category'
import Order from './admin/components/Order'
import CustomerLayout from './Pages/CustomerLayout'
import AddProduct from './admin/components/AddProduct'
import ProductList from './admin/components/ProductList'
import Addcategoryform from './admin/components/Addcategoryform'
import Addcategorytable from './admin/components/Addcategorytable'
import Adduser from './admin/components/Adduser'
import Addorder from './admin/components/Addorder'
import Stocktable from './admin/components/Stocktable'
import Adminlogin from './admin/layout/Adminlogin'
import Manageorder from './admin/components/manageorder'
import Managecustomer from './admin/components/Managecustomer'
import Inventory from './admin/components/Inventory'
import Manageuser from './admin/components/Manageuser'
import Superadlogin from './admin/layout/superadlogin'
import SuperAdminWelcome from './admin/components/SuperAdminWelcome'
import SuperadminLayout from './admin/layout/SuperadminLayout'
import Profilepage from './admin/components/Profilepage'
// import Addcustomer from './admin/components/Addcustomer'
// import PaymentPage from './components/PaymentPage'
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
        {/* <CustomNavbar /> */}
          <ScrollToTop />
          <Routes>
          <Route element={<CustomerLayout />}>
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
          <Route path="/track/:orderId" element={<Track />} />
          <Route path="/contact" element={<Contactus />} />
          <Route path="/term" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/shipping" element={<Shipping />} />
           {/* <Route path="/shop" element={<Categories />} /> */}
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          {/* <Route path="/subcategory/:categoryName" element={<SubcategoryPage />} />  */}
          <Route path="/subcategory/:categoryName" element={<SubcategoryPage />} />

          <Route path="/cart" element={<ViewPage />} />  
          <Route path="/product/:name" element={<ProductDetails />} />
          {/* <Route path="/checkout" element={<CheckoutAuthPage />} /> */}
           {/* <Route path="/checkout" element={<Checkout />} /> 
           <Route path="/checkout/address" element={<AddressPage />} />
           <Route path="/checkout/payment" element={<PaymentPage />} />
           <Route path="/checkout/summary" element={<OrderSummaryPage />} /> */}
           {/* <Route path="/order-summary" element={<OrderSummaryPage />} /> */}
           {/* <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/order-summary" element={<OrderSummaryPage />} /> */}
          {/* <Route path="/order-success" element={<OrderSuccessPage />} /> */}
           {/* <Route path="/login" element={<CheckoutAuthPage />} /> */}
          {/* <Route path="/checkout" element={<Checkout />} /> */}
          {/* <Route path="/summary" element={<SummaryPage />} /> */}
          <Route path="/checkout" element={<Checkout />} /> 
          <Route path="/checkout/address" element={<AddressPage />} />
          <Route path="/checkout/payment" element={<PaymentPage />} />
          <Route path="/checkout/summary" element={<OrderSummaryPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          </Route>
          {/* <Route path="/admin" element={<AdminLayout />}> */}
          <Route path="/adminlogin" element={<Adminlogin />} />
<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<Dashboard />} />
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="category" element={<Category />} />
           <Route path="category/add" element={<Addcategoryform />} />
            <Route path="category/list" element={<Addcategorytable />} />
          {/* <Route path="products" element={<Products />} /> */}
           <Route path="products/add" element={<AddProduct />} />
           <Route path="products/list" element={<ProductList />} />
          {/* <Route path="users" element={<Users />} />
           <Route path="users/list" element={<Adduser />} /> */}
            {/* <Route path="customer" element={<Customer />} /> */}
           <Route path="customer/list" element={<Managecustomer />} />
           {/* <Route path="customer/add" element={<Addcustomer />} /> */}
           <Route path="orders" element={<Order />} /> 
          <Route path="orders/list" element={<Manageorder />} /> 
          {/* <Route path="orders/list" element={<Addorder />} /> */}
          {/* <Route path="enquiries" element={<Enquiries />} /> */}
          {/* <Route path="enquiries/list" element={<Enquiriestable />} /> */}
          <Route path="inventory" element={<Inventory />} />
          <Route path="inventory/list" element={<Stocktable />} />
          {/* <Route path="user" element={<Staff />} /> */}
          <Route path="users/add" element={<Adduser />} />
          <Route path="users/list" element={<Manageuser />} />
          {/* <Route path="payments" element={<Payment />} /> */}
          <Route path="reports" element={<Report />} />
          <Route path="settings" element={<Setting />} />
          </Route>
           {/* <Route path="/adminlogin" element={<Adminlogin />} /> */}
           {/* <Route path="/superadminlogin" element={<Superadlogin />} />
           <Route path="/superadmin/layout" element={<SuperadminLayout />} /> */}
          <Route path="/superadminlogin" element={<Superadlogin />} />
{/* 
<Route path="/superadmin" element={<SuperadminLayout />}>
  <Route index element={<Profilepage />} />          
  <Route path="profile" element={<Profilepage />} />  */}
  <Route path="/superadmin" element={<SuperadminLayout />}>       
  <Route path="dashboard" element={<Dashboard />} /> 
  <Route path="profile" element={<Profilepage />} /> 
  <Route path="users/add" element={<Adduser />} />
  <Route path="users/manage" element={<Manageuser/>} />
  <Route path="category/add" element={<Addcategoryform />} />
  <Route path="category/manage" element={<Addcategorytable />} />
  <Route path="products/add" element={<AddProduct />} />
  <Route path="products/manage" element={<ProductList />} />
  <Route path="customers/manage" element={<Managecustomer />} />
  {/* <Route path="customers/manage" element={<Managecustomer />} /> */}
  <Route path="orders/manage" element={<Manageorder />} />
  <Route path="inventory/manage" element={<Stocktable />} />
  <Route path="reports" element={<Report />} />
  <Route path="settings" element={<Setting />} />
</Route>
          </Routes>
       {/* <Footer /> */}
    </>
  )
}
export default App

