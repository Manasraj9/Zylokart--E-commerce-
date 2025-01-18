import React from 'react';
import { Link } from 'react-router-dom';
import { PiShoppingCartSimpleThin } from "react-icons/pi";

const Navbar = () => {
  return (
    <nav className='bg-black text-white'>
      <div className="mycontainer px-4 py-3 flex h-14 items-center justify-between">
        {/* Logo */}
        <div className='relative flex items-center gap-1'>
          <PiShoppingCartSimpleThin className='text-4xl text-red-600'/>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 shadow-xl transform transition-all duration-500 hover:scale-110">
          Zylokart</h1>
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

export default Navbar;

