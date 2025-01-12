import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = () => {
  return (
    <div style={{ backgroundColor: '#3a3a3a' }} className="min-w-[1250px] min-h-[405px]">
      <div className='pl-[50px]'>
        <div className="max-w-[1400px] min-h-[300px] max-h-[300px] bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Product Image */}
          <img
            className=" "
            src=""
            alt="Product"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

