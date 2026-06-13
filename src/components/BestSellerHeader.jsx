import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const BestSellerHeader = ({ onPrev, onNext }) => {
  return (
    <div className="flex items-center justify-between bg-white px-10 py-6">
      <h3 className="uppercase text-xl font-bold"><span className=' border-b-3 border-black border-width-2'>Best</span> Seller</h3>

      <div className="flex gap-3">
        <button onClick={onPrev} className="p-2 border rounded-full">
          <FaChevronLeft />
        </button>
        <button onClick={onNext} className="p-2 border rounded-full">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default BestSellerHeader;