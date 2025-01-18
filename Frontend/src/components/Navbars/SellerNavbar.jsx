import React from 'react'
import { Link } from 'react-router-dom';
import { IoMdAddCircle } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { PiShoppingCartSimpleThin } from "react-icons/pi";

const SellerNavbar = () => {
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
          <ul className='flex gap-5 items-center'>
            <li>
              <Link to="/SAddProduct">
                <IoMdAddCircle className='text-4xl' />
              </Link>
            </li>
            <li>
              <Link to="/Account">
                <MdAccountCircle className="text-4xl" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default SellerNavbar
