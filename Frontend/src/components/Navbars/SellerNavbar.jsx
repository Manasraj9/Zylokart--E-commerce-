import React from 'react'
import { Link } from 'react-router-dom';

const SellerNavbar = () => {
  return (
      <nav className='bg-black text-white'>
        <div className="mycontainer px-4 py-3 flex h-14 items-center justify-between">
          {/* Logo */}
          <div className="logo">
            <img className="max-w-[200px] max-h-auto" src="/icons/SwiftShopper.svg" alt="SwiftShopper Logo" />
          </div>
          
          {/* Links */}
          <div>
            <ul className='flex gap-5'>
              <li>
                <Link to="/Login">
                  <button className='inline-flex items-center gap-0.5 border-2 border-white-900 py-1 rounded px-2.5'>Login</button>
                </Link>
              </li>
              <li>
                <Link to="/Signup">
                  <button className='inline-flex items-center gap-0.5 border-2 border-white-900 py-1 rounded px-2.5'>Signup</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

export default SellerNavbar
