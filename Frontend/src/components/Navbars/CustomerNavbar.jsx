import React from 'react'
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { MdAccountCircle } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { PiShoppingCartSimpleThin } from "react-icons/pi";

const CustomerNavbar = () => {
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
                            <div className='relative flex items-center gap-3'>
                            <input
                                type="text"
                                placeholder="Search Products"
                                className="px-4 py-2 border-2 border-white text-white placeholder-[#B0BEC5] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:text-gray-900 rounded-lg"
                            />
                            <FaSearch className='text-2xl' />
                            </div>
                        </li>
                        <li>
                            <Link to="/Wishlist">
                                <FaHeart className='text-4xl'/>
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart">
                                <FaShoppingCart className='text-4xl'/>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Accound">
                                <MdAccountCircle className="text-4xl" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default CustomerNavbar
