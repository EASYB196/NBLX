import React from 'react';
import { useCart } from '../Context/cartContext';

function BuyNowLoadingModal() {
  const { buyNowProcessing } = useCart();

  if (!buyNowProcessing) {
    return null;
  }

  return (
    <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-[2px]'>
      <div className='bg-white rounded-xl px-6 py-5 shadow-xl flex items-center gap-4'>
        <div className='w-6 h-6 border-3 border-gray-300 border-t-black rounded-full animate-spin' />

        <p className='text-sm font-medium text-black'>
          Processing your order...
        </p>
      </div>
    </div>
  );
}

export default BuyNowLoadingModal;