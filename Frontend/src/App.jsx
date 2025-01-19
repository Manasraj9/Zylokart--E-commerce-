// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
{/* Imports for Landingpage, Login, and Signup etc. */ }
import Landing from './pages/Landingpage';
import Login from './pages/Login';
import Signup from './pages/Signup';

{/* Customer Imports */ }
import CustomerHomepage from './pages/Customer/CustomerHomepage';
import Wishlist from './pages/Customer/Wishlist';

{/* Seller Imports */ }
import SellerHomepage from './pages/Seller/SellerHomepage';
import SellerAddProduct from './pages/Seller/SellerAddProduct';
import SellerProduct from './pages/Seller/SellerProduct';
import SellerNotification from './pages/Seller/SellerNotifiction';
import SellerRevenue from './pages/Seller/SellerRevenue';
import SHelp from './pages/Seller/SHelp';
import SOrderManagement from './pages/Seller/SOrderManagement';
import SSettings from './pages/Seller/SSettings';

{/* Admin Imports */ }
import AdminHomepage from './pages/Admin/AdminHomepage';


const App = () => {
  return (
    <Router>
       <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      <Routes>
        {/* Routes for Landingpage, Login, and Signup etc. */}
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />

        {/* Customer Routes */}
        <Route path="/Customer" element={<CustomerHomepage />} />
        <Route path="/Customer/Wishlist" element={<Wishlist />} />

        {/* Seller Routes */}
        <Route path="/Seller" element={<SellerHomepage />} />
        <Route path="/SAddProduct" element={<SellerAddProduct />} />
        <Route path="/SProducts" element={<SellerProduct />} />
        <Route path="/SNotification" element={<SellerNotification />} />
        <Route path="/SRevenue" element={<SellerRevenue />} />
        <Route path="/SHelp" element={<SHelp />} />
        <Route path="/SOrderManagement" element={<SOrderManagement />} />
        <Route path="/SSettings" element={<SSettings />} />

        {/* Admin Routes */}
        <Route path="/Admin" element={<AdminHomepage />} />

      </Routes>
    </Router>
  );
};

export default App;


