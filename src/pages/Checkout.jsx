
// import React, { useState } from 'react';
// import { useCart } from '../Context/cartContext';
// import { useNavigate } from 'react-router-dom';
// import Paystack from '@paystack/inline-js';

// const PAYSTACK_PUBLIC_KEY =
//   'pk_test_2eb7f8de0acd8210d035009e9a2df49bcc11493d';

// const Checkout = () => {
//   const { cartItems } = useCart();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);

//   const subtotal = cartItems.reduce(
//     (total, item) =>
//       total +
//       Number(item.price || 0) *
//         Number(item.quantity || 0),
//     0
//   );

//   const handlePayment = () => {
//     if (!email) {
//       alert('Please enter your email address.');
//       return;
//     }

//     setLoading(true);

//     const paystack = new Paystack();

//     paystack.newTransaction({
//       key: PAYSTACK_PUBLIC_KEY,
//       email,
//       amount: subtotal * 100,
//       currency: 'NGN',

//       onSuccess: (transaction) => {
//         console.log('Payment successful:', transaction);

//         setLoading(false);

//         navigate('/order-success');
//       },

//       onCancel: () => {
//         setLoading(false);
//         console.log('Payment cancelled');
//       },
//     });
//   };

//   return (
//     <div className="min-h-screen bg-white text-black px-5 py-10">
//       <div className="max-w-5xl mx-auto">

//         <h1 className="text-2xl font-bold mb-8">
//           Checkout
//         </h1>

//         <div className="grid md:grid-cols-2 gap-8">

//           {/* CUSTOMER DETAILS */}
//           <div>
//             <h2 className="text-lg font-bold mb-4">
//               Customer Information
//             </h2>

//             <div className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
//               />

//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
//               />

//               <input
//                 type="tel"
//                 placeholder="Phone Number"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
//               />

//               <textarea
//                 placeholder="Delivery Address"
//                 rows="4"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none"
//               />
//             </div>
//           </div>

//           {/* ORDER SUMMARY */}
//           <div>
//             <h2 className="text-lg font-bold mb-4">
//               Order Summary
//             </h2>

//             <div className="border border-gray-200 rounded-lg p-5">

//               {cartItems.map((item, index) => (
//                 <div
//                   key={`${item.id}-${item.selectedSize}-${index}`}
//                   className="flex justify-between gap-4 mb-4 pb-4 border-b border-gray-100"
//                 >
//                   <div>
//                     <p className="font-semibold text-sm">
//                       {item.name}
//                     </p>

//                     {item.selectedSize && (
//                       <p className="text-xs text-gray-500">
//                         Size: {item.selectedSize}
//                       </p>
//                     )}

//                     <p className="text-xs text-gray-500">
//                       Quantity: {item.quantity}
//                     </p>
//                   </div>

//                   <p className="font-semibold text-sm">
//                     ₦
//                     {(
//                       Number(item.price || 0) *
//                       Number(item.quantity || 0)
//                     ).toLocaleString('en-NG')}
//                   </p>
//                 </div>
//               ))}

//               <div className="flex justify-between items-center pt-2">
//                 <p className="text-lg font-semibold">
//                   Total
//                 </p>

//                 <p className="text-lg font-bold">
//                   ₦
//                   {subtotal.toLocaleString('en-NG')}
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={handlePayment}
//                 disabled={loading}
//                 className="w-full bg-black text-white py-3 mt-5 font-bold rounded-lg hover:opacity-90 transition"
//               >
//                 {loading ? 'Processing...' : 'Pay Now'}
//               </button>

//             </div>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default Checkout;


import React, { useState } from 'react';
import { useCart } from '../Context/cartContext';
import { useNavigate } from 'react-router-dom';
import Paystack from '@paystack/inline-js';

const PAYSTACK_PUBLIC_KEY =
  'pk_test_2eb7f8de0acd8210d035009e9a2df49bcc11493d';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  const handlePayment = () => {
    if (!email) {
      alert('Please enter your email address.');
      return;
    }

    setLoading(true);

    const paystack = new Paystack();

    paystack.newTransaction({
      key: PAYSTACK_PUBLIC_KEY,
      email,
      amount: subtotal * 100,
      currency: 'NGN',

      onSuccess: async (transaction) => {
        try {
          const response = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              reference: transaction.reference,
            }),
          });

          const result = await response.json();

          if (!response.ok || !result.success) {
            throw new Error('Payment verification failed');
          }

          console.log('Payment verified:', result.data);

          clearCart();
          setLoading(false);

          navigate('/order-success');
        } catch (error) {
          console.error('Verification error:', error);

          setLoading(false);

          alert(
            'Payment was received, but we could not verify it. Please contact NBLX support.'
          );
        }
      },

      onCancel: () => {
        setLoading(false);
        console.log('Payment cancelled');
      },
    });
  };

  return (
    <div className="min-h-screen bg-white text-black px-5 py-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-2xl font-bold mb-8">
          Checkout
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          {/* CUSTOMER DETAILS */}
          <div>
            <h2 className="text-lg font-bold mb-4">
              Customer Information
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
              />

              <textarea
                placeholder="Delivery Address"
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none"
              />
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div>
            <h2 className="text-lg font-bold mb-4">
              Order Summary
            </h2>

            <div className="border border-gray-200 rounded-lg p-5">

              {cartItems.map((item, index) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${index}`}
                  className="flex justify-between gap-4 mb-4 pb-4 border-b border-gray-100"
                >
                  <div>
                    <p className="font-semibold text-sm">
                      {item.name}
                    </p>

                    {item.selectedSize && (
                      <p className="text-xs text-gray-500">
                        Size: {item.selectedSize}
                      </p>
                    )}

                    <p className="text-xs text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-sm">
                    ₦
                    {(
                      Number(item.price || 0) *
                      Number(item.quantity || 0)
                    ).toLocaleString('en-NG')}
                  </p>
                </div>
              ))}

              <div className="flex justify-between items-center pt-2">
                <p className="text-lg font-semibold">
                  Total
                </p>

                <p className="text-lg font-bold">
                  ₦
                  {subtotal.toLocaleString('en-NG')}
                </p>
              </div>

              <button
                type="button"
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-black text-white py-3 mt-5 font-bold rounded-lg hover:opacity-90 transition"
              >
                {loading ? 'Processing...' : 'Pay Now'}
              </button>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Checkout;
