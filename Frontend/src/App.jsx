// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
{/* Imports for Landingpage, Login, and Signup etc. */}
import Landing from './pages/Landingpage';
import Login from './pages/Login';
import Signup from './pages/Signup';

{/* Customer Imports */}
import CustomerHomepage from './pages/Customer/CustomerHomepage';

{/* Seller Imports */}
import SellerHomepage from './pages/Seller/SellerHomepage';

{/* Admin Imports */}
import AdminHomepage from './pages/Admin/AdminHomepage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes for Landingpage, Login, and Signup etc. */}
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />

        {/* Customer Routes */}
        <Route path="/Customer" element={<CustomerHomepage />} />

        {/* Seller Routes */}
        <Route path="/Seller" element={<SellerHomepage />} />

        {/* Admin Routes */}
        <Route path="/Admin" element={<AdminHomepage />} />

      </Routes>
    </Router>
  );
};

export default App;


