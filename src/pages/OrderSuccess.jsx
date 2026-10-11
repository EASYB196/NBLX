
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

function OrderSuccess() {
  const location = useLocation();
  const [copied, setCopied] = useState('');

  let storedOrder = {};

  try {
    storedOrder = JSON.parse(
      localStorage.getItem('nblx_last_order') || '{}',
    );
  } catch {
    storedOrder = {};
  }

  const orderId =
    location.state?.orderId ||
    location.state?.order?.orderId ||
    storedOrder.orderId ||
    localStorage.getItem('nblx_last_order_id') ||
    '';

  const paymentReference =
    location.state?.paymentReference ||
    location.state?.order?.reference ||
    storedOrder.reference ||
    localStorage.getItem('nblx_last_payment_reference') ||
    '';

  const copyValue = async (value, label) => {
    if (!value) {
      toast.error(`${label} is unavailable.`);
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      toast.success(`${label} copied!`);
    } catch {
      toast.error(`Unable to copy ${label.toLowerCase()}.`);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-5 py-10">
      <div className="text-center max-w-md w-full">
        <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto mb-5 text-3xl font-bold">
          ✓
        </div>

        <h1 className="text-3xl font-bold mb-3">
          Order Confirmed!
        </h1>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Thank you for shopping with NBLX. Your payment has been
          verified and your order has been received.
        </p>

        <div className="border border-gray-200 rounded-xl p-5 mb-4 text-left">
          <p className="text-sm text-gray-500 mb-2">
            NBLX Order ID
          </p>

          {orderId ? (
            <>
              <div className="flex items-center justify-between gap-3">
                <span className="font-bold text-lg break-all">
                  {orderId}
                </span>

                <button
                  type="button"
                  onClick={() => copyValue(orderId, 'Order ID')}
                  className="shrink-0 border border-black rounded-lg px-3 py-2 text-sm font-semibold hover:bg-black hover:text-white transition"
                >
                  {copied === 'Order ID' ? 'Copied' : 'Copy'}
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Keep this ID for tracking your order and contacting
                NBLX support.
              </p>
            </>
          ) : (
            <p className="text-sm text-amber-700">
              Your NBLX Order ID is unavailable on this page.
              Please contact support with your payment reference.
            </p>
          )}
        </div>

        <div className="border border-gray-200 rounded-xl p-5 mb-6 text-left">
          <p className="text-sm text-gray-500 mb-2">
            Paystack Payment Reference
          </p>

          {paymentReference ? (
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-sm break-all">
                {paymentReference}
              </span>

              <button
                type="button"
                onClick={() =>
                  copyValue(paymentReference, 'Payment reference')
                }
                className="shrink-0 border border-gray-300 rounded-lg px-3 py-2 text-sm font-semibold hover:bg-gray-100 transition"
              >
                {copied === 'Payment reference' ? 'Copied' : 'Copy'}
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Payment reference unavailable.
            </p>
          )}

          <p className="text-xs text-gray-500 mt-3">
            This reference identifies your payment. It is different
            from your NBLX Order ID.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition"
          >
            Continue Shopping
          </Link>

          <Link
            to="/profile/orders"
            className="inline-block border border-black text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            My Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
