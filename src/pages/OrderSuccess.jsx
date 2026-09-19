import React from 'react';
import { Link } from 'react-router-dom';

function OrderSuccess() {
  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-5">
      <div className="text-center max-w-md">

        <div className="text-5xl mb-5">
          ✓
        </div>

        <h1 className="text-3xl font-bold mb-3">
          Order Confirmed
        </h1>

        <p className="text-gray-600 mb-8">
          Thank you for shopping with NBLX. Your payment was
          successful and your order has been received.
        </p>

        <Link
          to="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition"
        >
          Continue Shopping
        </Link>

      </div>
    </div>
  );
}

export default OrderSuccess;
