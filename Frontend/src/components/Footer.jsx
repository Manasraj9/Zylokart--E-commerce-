import React from 'react';


const Footer = () => {
  return (
    <footer className='bg-black text-white'>
      <div className='flex'>
        <ul className='pl-[114px] pt-[5px]'>
          <li className='font-bold text-xl'>Exclusive</li>
          <li className='pt-[5px] text-base'>Subscribe</li>
          <li className='pt-[5px] text-sm'>Get 10% off your first order</li>
          <li className='pt-[5px]'>
            <div className='relative'>
              <input
                type="text" placeholder="Enter your email" className="bg-black border rounded text-base placeholder-white input-with-placeholder px-2 pt-2 pb-1"/>
              <img src="/icons/icon-send.svg" alt="Send Icon" className="absolute top-1/2 pl-[170px] -translate-y-1/2"/>
            </div>
          </li>
        </ul>

        <ul className='pl-[227px]'>
          <li className='pt-[5px] text-base'>Support</li>
          <li className='pt-[8px] text-sm'>West Bengal, India</li>
          <li className='pt-[8px] text-sm'>Name@gmail.com</li>
          <li className='pt-[8px] text-sm'>+91-XX-XXXX-XXXX</li>
        </ul>

        <ul className='pl-[227px]'>
          <li className='pt-[5px] text-base'>Account</li>
          <li className='pt-[5px] text-sm'>My Account</li>
          <li className='pt-[5px] text-sm'>Login/Register</li>
          <li className='pt-[5px] text-sm'>Cart</li>
          <li className='pt-[5px] text-sm'>Wishlist</li>
          <li className='pt-[5px] text-sm'>Shop</li>
        </ul>
        <ul className='pl-[227px]'>
          <li className='pt-[5px] text-base'>Quick Link</li>
          <li className='pt-[5px] text-sm'>Privacy Policy</li>
          <li className='pt-[5px] text-sm'>terms of Use</li>
          <li className='pt-[5px] text-sm'>FAQ</li>
          <li className='pt-[5px] text-sm'>Contact</li>
        </ul>
      </div>
      <div className='mt-[5px]'>
        <hr className='border-t-2 border-white bg-black' />
        <div className='p-[3px] text-xs text-white pl-[650px]'>&copy; Copyright XXXX 2024. All right reserved</div>
      </div>
    </footer>
  );
};

export default Footer;
