import React from 'react'
import { Link } from 'react-router-dom';
import { IoMdAddCircle } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";

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
