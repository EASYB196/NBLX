// import React, { useState } from 'react';
// import { useCart } from '../Context/cartContext';
// import { useNavigate } from 'react-router-dom';
// import Paystack from '@paystack/inline-js';
// import toast from 'react-hot-toast';

// const PAYSTACK_PUBLIC_KEY =
//   'pk_test_2eb7f8de0acd8210d035009e9a2df49bcc11493d';

// const NBLX_WHATSAPP_NUMBER = '2349117098144';

// const Checkout = () => {
//   const { cartItems, clearCart } = useCart();
//   const navigate = useNavigate();

//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Tracks error messages for individual input fields
//   const [errors, setErrors] = useState({});

//   const [paymentIssue, setPaymentIssue] = useState({
//     show: false,
//     reference: '',
//   });

//   // ======================================================
//   // SUBTOTAL
//   // ======================================================

//   const subtotal = cartItems.reduce(
//     (total, item) =>
//       total +
//       Number(item.price || 0) * Number(item.quantity || 0),
//     0
//   );

//   // ======================================================
//   // EMAIL VALIDATION
//   // ======================================================

//   const isValidEmail = (email) => {
//     return /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(
//       email.trim()
//     );
//   };

//   // ======================================================
//   // FORM VALIDATION
//   // ======================================================

//   const validateForm = () => {
//     const newErrors = {};

//     // 1. Full Name Validation
//     const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;

//     if (!fullName.trim()) {
//       newErrors.fullName = 'Full name is required.';
//     } else if (!nameRegex.test(fullName.trim())) {
//       newErrors.fullName =
//         'Please enter a valid full name (letters only).';
//     }

//     // 2. Email Validation
//     if (!email.trim()) {
//       newErrors.email = 'Email address is required.';
//     } else if (!isValidEmail(email)) {
//       newErrors.email =
//         'Please enter a valid Gmail address (e.g., username@gmail.com).';
//     }

//     // 3. Phone Number Validation
//     const phoneRegex = /^\+?[0-9\s-]{7,15}$/;

//     if (!phone.trim()) {
//       newErrors.phone = 'Phone number is required.';
//     } else if (!phoneRegex.test(phone.trim())) {
//       newErrors.phone =
//         'Please enter a valid phone number (digits only).';
//     }

//     // 4. Delivery Address Validation
//     if (!address.trim()) {
//       newErrors.address = 'Delivery address is required.';
//     } else if (address.trim().length < 5) {
//       newErrors.address =
//         'Please enter a complete delivery address.';
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   // ======================================================
//   // PAYMENT
//   // ======================================================

//   const handlePayment = () => {
//     if (cartItems.length === 0) {
//       return toast.error('Your cart is empty.', {
//         id: 'cart-empty',
//       });
//     }

//     // Validate form prior to opening Paystack gateway
//     if (!validateForm()) {
//       return toast.error(
//         'Please fix the errors in the form before proceeding.',
//         {
//           id: 'form-validation',
//         }
//       );
//     }

//     setLoading(true);

//     const paystack = new Paystack();

//     paystack.newTransaction({
//       key: PAYSTACK_PUBLIC_KEY,
//       email: email.trim(),
//       amount: subtotal * 100,
//       currency: 'NGN',

//       // ==================================================
//       // PAYMENT SUCCESS
//       // ==================================================

//       onSuccess: async (transaction) => {
//         try {
//           const response = await fetch('/api/verify-payment', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               reference: transaction.reference,

//               customerDetails: {
//                 fullName: fullName.trim(),
//                 email: email.trim(),
//                 phone: phone.trim(),
//                 address: address.trim(),
//               },
//             }),
//           });

//           const result = await response.json();

//           if (!response.ok || !result.success) {
//             throw new Error(
//               'Verification failed on server'
//             );
//           }

//           toast.success(
//             'Payment verified successfully!',
//             {
//               id: 'payment-success',
//             }
//           );

//           clearCart();

//           setLoading(false);

//           navigate('/order-success');
//         } catch (error) {
//           console.error(
//             'Verification error:',
//             error
//           );

//           setLoading(false);

//           setPaymentIssue({
//             show: true,
//             reference: transaction.reference,
//           });
//         }
//       },

//       // ==================================================
//       // PAYMENT CANCELLED
//       // ==================================================

//       onCancel: () => {
//         setLoading(false);

//         toast('Payment cancelled.', {
//           id: 'payment-cancelled',
//           icon: 'ℹ️',
//         });
//       },
//     });
//   };

//   // ======================================================
//   // WHATSAPP ORDER MESSAGE
//   // ======================================================

//   const generateWhatsAppLink = () => {
//     const itemsSummary = cartItems
//       .map(
//         (item) =>
//           `• ${item.name}${
//             item.selectedSize
//               ? ` (Size: ${item.selectedSize})`
//               : ''
//           } x${item.quantity} - ₦${(
//             Number(item.price || 0) *
//             Number(item.quantity || 0)
//           ).toLocaleString('en-NG')}`
//       )
//       .join('\n');

//     const message = `Hello NBLX Support,

// I just completed a payment, but the automated verification requires manual review.

// *Order Details:*
// Name: ${fullName.trim()}
// Phone: ${phone.trim()}
// Email: ${email.trim()}
// Delivery Address/Location: ${address.trim()}
// Reference Code: ${paymentIssue.reference}

// *Items Purchased:*
// ${itemsSummary}

// *Total:* ₦${subtotal.toLocaleString('en-NG')}

// Please assist with verifying this order. Thank you!`;

//     return `https://wa.me/${NBLX_WHATSAPP_NUMBER}?text=${encodeURIComponent(
//       message
//     )}`;
//   };

//   // ======================================================
//   // COPY REFERENCE
//   // ======================================================

//   const copyReference = () => {
//     navigator.clipboard.writeText(
//       paymentIssue.reference
//     );

//     toast.success(
//       'Transaction reference copied!',
//       {
//         id: 'reference-copied',
//       }
//     );
//   };

//   // ======================================================
//   // UI
//   // ======================================================

//   return (
//     <div className='min-h-screen bg-white text-black px-5 py-10'>
//       <div className='max-w-5xl mx-auto'>

//         <h1 className='text-2xl font-bold mb-8'>
//           Checkout
//         </h1>

//         <div className='grid md:grid-cols-2 gap-8'>

//           {/* ==================================================
//               CUSTOMER DETAILS
//           ================================================== */}

//           <div>

//             <h2 className='text-lg font-bold mb-4'>
//               Customer Information
//             </h2>

//             <div className='space-y-4'>

//               {/* FULL NAME */}

//               <div>

//                 <input
//                   type='text'
//                   placeholder='Full Name'
//                   value={fullName}
//                   onChange={(e) => {
//                     setFullName(e.target.value);

//                     if (errors.fullName) {
//                       setErrors((prev) => ({
//                         ...prev,
//                         fullName: '',
//                       }));
//                     }
//                   }}
//                   className={`w-full border rounded-lg px-4 py-3 outline-none transition ${
//                     errors.fullName
//                       ? 'border-red-500 focus:border-red-500'
//                       : 'border-gray-300 focus:border-black'
//                   }`}
//                 />

//                 {errors.fullName && (
//                   <p className='text-xs text-red-500 mt-1 font-medium'>
//                     {errors.fullName}
//                   </p>
//                 )}

//               </div>

//               {/* EMAIL */}

//               <div>

//                 <input
//                   type='email'
//                   placeholder='Email Address (@gmail.com)'
//                   value={email}
//                   onChange={(e) => {
//                     setEmail(e.target.value);

//                     if (errors.email) {
//                       setErrors((prev) => ({
//                         ...prev,
//                         email: '',
//                       }));
//                     }
//                   }}
//                   className={`w-full border rounded-lg px-4 py-3 outline-none transition ${
//                     errors.email
//                       ? 'border-red-500 focus:border-red-500'
//                       : 'border-gray-300 focus:border-black'
//                   }`}
//                 />

//                 {errors.email && (
//                   <p className='text-xs text-red-500 mt-1 font-medium'>
//                     {errors.email}
//                   </p>
//                 )}

//               </div>

//               {/* PHONE */}

//               <div>

//                 <input
//                   type='tel'
//                   placeholder='Phone Number'
//                   value={phone}
//                   onChange={(e) => {
//                     setPhone(e.target.value);

//                     if (errors.phone) {
//                       setErrors((prev) => ({
//                         ...prev,
//                         phone: '',
//                       }));
//                     }
//                   }}
//                   className={`w-full border rounded-lg px-4 py-3 outline-none transition ${
//                     errors.phone
//                       ? 'border-red-500 focus:border-red-500'
//                       : 'border-gray-300 focus:border-black'
//                   }`}
//                 />

//                 {errors.phone && (
//                   <p className='text-xs text-red-500 mt-1 font-medium'>
//                     {errors.phone}
//                   </p>
//                 )}

//               </div>

//               {/* DELIVERY ADDRESS */}

//               <div>

//                 <textarea
//                   placeholder='Delivery Address'
//                   rows='4'
//                   value={address}
//                   onChange={(e) => {
//                     setAddress(e.target.value);

//                     if (errors.address) {
//                       setErrors((prev) => ({
//                         ...prev,
//                         address: '',
//                       }));
//                     }
//                   }}
//                   className={`w-full border rounded-lg px-4 py-3 outline-none transition resize-none ${
//                     errors.address
//                       ? 'border-red-500 focus:border-red-500'
//                       : 'border-gray-300 focus:border-black'
//                   }`}
//                 />

//                 {errors.address && (
//                   <p className='text-xs text-red-500 mt-1 font-medium'>
//                     {errors.address}
//                   </p>
//                 )}

//               </div>

//             </div>
//           </div>

//           {/* ==================================================
//               ORDER SUMMARY
//           ================================================== */}

//           <div>

//             <h2 className='text-lg font-bold mb-4'>
//               Order Summary
//             </h2>

//             <div className='border border-gray-200 rounded-lg p-5'>

//               {cartItems.length === 0 ? (
//                 <p className='text-gray-500 text-sm py-4'>
//                   Your cart is empty.
//                 </p>
//               ) : (
//                 cartItems.map((item, index) => (
//                   <div
//                     key={`${item.id}-${item.selectedSize}-${index}`}
//                     className='flex justify-between gap-4 mb-4 pb-4 border-b border-gray-100'
//                   >

//                     <div>

//                       <p className='font-semibold text-sm'>
//                         {item.name}
//                       </p>

//                       {item.selectedSize && (
//                         <p className='text-xs text-gray-500'>
//                           Size: {item.selectedSize}
//                         </p>
//                       )}

//                       <p className='text-xs text-gray-500'>
//                         Quantity: {item.quantity}
//                       </p>

//                     </div>

//                     <p className='font-semibold text-sm'>
//                       ₦
//                       {(
//                         Number(item.price || 0) *
//                         Number(item.quantity || 0)
//                       ).toLocaleString('en-NG')}
//                     </p>

//                   </div>
//                 ))
//               )}

//               <div className='flex justify-between items-center pt-2'>

//                 <p className='text-lg font-semibold'>
//                   Total
//                 </p>

//                 <p className='text-lg font-bold'>
//                   ₦ {subtotal.toLocaleString('en-NG')}
//                 </p>

//               </div>

//               <button
//                 type='button'
//                 onClick={handlePayment}
//                 disabled={
//                   loading ||
//                   cartItems.length === 0
//                 }
//                 className='w-full bg-black text-white py-3 mt-5 font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50'
//               >
//                 {loading
//                   ? 'Processing...'
//                   : 'Pay Now'}
//               </button>

//             </div>
//           </div>

//         </div>
//       </div>

//       {/* ======================================================
//           VERIFICATION ISSUES MODAL
//       ====================================================== */}

//       {paymentIssue.show && (
//         <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>

//           {/* BACKDROP */}

//           <div
//             onClick={() =>
//               setPaymentIssue({
//                 show: false,
//                 reference: '',
//               })
//             }
//             className='absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity'
//           />

//           {/* MODAL */}

//           <div className='relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 md:p-8 z-10 text-center'>

//             <div className='w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold'>
//               !
//             </div>

//             <h2 className='text-xl font-bold text-black mb-2'>
//               Payment Pending Verification
//             </h2>

//             <p className='text-sm text-gray-600 leading-relaxed mb-6'>
//               Your payment was received, but
//               auto-verification is taking longer than
//               usual. Click below to send your purchase
//               summary directly to our WhatsApp support
//               team.
//             </p>

//             {/* REFERENCE */}

//             <div className='bg-gray-50 border border-gray-200 rounded-xl p-3 mb-6 text-left'>

//               <p className='text-xs text-gray-500 font-medium'>
//                 Reference Code:
//               </p>

//               <div className='flex justify-between items-center mt-1'>

//                 <span className='font-mono text-sm font-bold text-black'>
//                   {paymentIssue.reference}
//                 </span>

//                 <button
//                   onClick={copyReference}
//                   className='text-xs text-black font-semibold underline hover:opacity-80'
//                 >
//                   Copy
//                 </button>

//               </div>
//             </div>

//             {/* ACTIONS */}

//             <div className='space-y-3'>

//               <a
//                 href={generateWhatsAppLink()}
//                 target='_blank'
//                 rel='noopener noreferrer'
//                 className='block w-full bg-emerald-600 text-white py-3.5 rounded-xl font-medium text-sm hover:bg-emerald-700 transition'
//               >
//                 Send Order Details via WhatsApp
//               </a>

//               <button
//                 onClick={() =>
//                   setPaymentIssue({
//                     show: false,
//                     reference: '',
//                   })
//                 }
//                 className='w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium text-sm hover:bg-gray-200 transition'
//               >
//                 Close & Return
//               </button>

//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Checkout;




import React, { useState } from 'react';
import { useCart } from '../Context/cartContext';
import { useNavigate } from 'react-router-dom';
import Paystack from '@paystack/inline-js';
import toast from 'react-hot-toast';

const PAYSTACK_PUBLIC_KEY =
  'pk_test_2eb7f8de0acd8210d035009e9a2df49bcc11493d';

const NBLX_WHATSAPP_NUMBER = '2349117098144';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  // Tracks error messages for individual input fields
  const [errors, setErrors] = useState({});

  const [paymentIssue, setPaymentIssue] = useState({
    show: false,
    reference: '',
  });

  // ======================================================
  // SUBTOTAL
  // ======================================================

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  // ======================================================
  // EMAIL VALIDATION
  // ======================================================

  const isValidEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(
      email.trim()
    );
  };

  // ======================================================
  // FORM VALIDATION
  // ======================================================

  const validateForm = () => {
    const newErrors = {};

    // 1. Full Name Validation
    const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (!nameRegex.test(fullName.trim())) {
      newErrors.fullName =
        'Please enter a valid full name (letters only).';
    }

    // 2. Email Validation
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!isValidEmail(email)) {
      newErrors.email =
        'Please enter a valid Gmail address (e.g., username@gmail.com).';
    }

    // 3. Phone Number Validation
    const phoneRegex = /^\+?[0-9\s-]{7,15}$/;

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(phone.trim())) {
      newErrors.phone =
        'Please enter a valid phone number (digits only).';
    }

    // 4. Delivery Address Validation
    if (!address.trim()) {
      newErrors.address = 'Delivery address is required.';
    } else if (address.trim().length < 5) {
      newErrors.address =
        'Please enter a complete delivery address.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ======================================================
  // PAYSTACK PAYMENT
  // ======================================================

  const handlePayment = () => {
    if (cartItems.length === 0) {
      return toast.error('Your cart is empty.', {
        id: 'cart-empty',
      });
    }

    if (!validateForm()) {
      return toast.error(
        'Please fix the errors in the form before proceeding.',
        {
          id: 'form-validation',
        }
      );
    }

    setLoading(true);

    const paystack = new Paystack();

    paystack.newTransaction({
      key: PAYSTACK_PUBLIC_KEY,
      email: email.trim(),
      amount: subtotal * 100,
      currency: 'NGN',

      // ==================================================
      // PAYMENT SUCCESS
      // ==================================================

      onSuccess: async (transaction) => {
        try {
          const response = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              reference: transaction.reference,

              customerDetails: {
                fullName: fullName.trim(),
                email: email.trim(),
                phone: phone.trim(),
                address: address.trim(),
              },
            }),
          });

          const result = await response.json();

          if (!response.ok || !result.success) {
            throw new Error(
              'Verification failed on server'
            );
          }

          toast.success(
            'Payment verified successfully!',
            {
              id: 'payment-success',
            }
          );

          clearCart();

          setLoading(false);

          navigate('/order-success');
        } catch (error) {
          console.error(
            'Verification error:',
            error
          );

          setLoading(false);

          setPaymentIssue({
            show: true,
            reference: transaction.reference,
          });
        }
      },

      // ==================================================
      // PAYMENT CANCELLED
      // ==================================================

      onCancel: () => {
        setLoading(false);

        toast('Payment cancelled.', {
          id: 'payment-cancelled',
          icon: 'ℹ️',
        });
      },
    });
  };

  // ======================================================
  // FLUTTERWAVE PAYMENT
  // ======================================================

const handleFlutterwavePayment = async () => {
  // ======================================================
  // CHECK CART
  // ======================================================

  if (cartItems.length === 0) {
    return toast.error('Your cart is empty.', {
      id: 'cart-empty',
    });
  }

  // ======================================================
  // VALIDATE FORM
  // ======================================================

  if (!validateForm()) {
    return toast.error(
      'Please fix the errors in the form before proceeding.',
      {
        id: 'form-validation',
      }
    );
  }

  // ======================================================
  // START LOADING
  // ======================================================

  setLoading(true);

  try {
    const response = await fetch(
      '/api/flutterwave-payment',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },

        body: JSON.stringify({
          amount: Number(subtotal),

          customerDetails: {
            fullName: fullName.trim(),
            email: email.trim(),
            phone: phone.trim(),
            address: address.trim(),
          },
        }),
      }
    );

    // ====================================================
    // READ RESPONSE SAFELY
    // ====================================================

    const responseText = await response.text();

    let result = null;

    if (responseText.trim()) {
      try {
        result = JSON.parse(responseText);
      } catch {
        console.error(
          'Invalid JSON response from Flutterwave API:',
          responseText
        );

        throw new Error(
          'The payment server returned an invalid response.'
        );
      }
    }

    // ====================================================
    // CHECK SERVER RESPONSE
    // ====================================================

    if (!response.ok) {
      throw new Error(
        result?.message ||
          `Payment server error (${response.status}).`
      );
    }

    if (!result) {
      throw new Error(
        'The payment server returned an empty response.'
      );
    }

    if (!result.success) {
      throw new Error(
        result.message ||
          'Unable to initialize Flutterwave payment.'
      );
    }

    if (!result.link) {
      throw new Error(
        'Flutterwave payment link was not returned.'
      );
    }

    // ====================================================
    // REDIRECT TO FLUTTERWAVE
    // ====================================================

    window.location.href = result.link;
  } catch (error) {
    console.error(
      'Flutterwave payment error:',
      error
    );

    setLoading(false);

    toast.error(
      error.message ||
        'Unable to start Flutterwave payment.',
      {
        id: 'flutterwave-error',
      }
    );
  }
};

  // ======================================================
  // WHATSAPP ORDER MESSAGE
  // ======================================================

  const generateWhatsAppLink = () => {
    const itemsSummary = cartItems
      .map(
        (item) =>
          `• ${item.name}${
            item.selectedSize
              ? ` (Size: ${item.selectedSize})`
              : ''
          } x${item.quantity} - ₦${(
            Number(item.price || 0) *
            Number(item.quantity || 0)
          ).toLocaleString('en-NG')}`
      )
      .join('\n');

    const message = `Hello NBLX Support,

I just completed a payment, but the automated verification requires manual review.

*Order Details:*
Name: ${fullName.trim()}
Phone: ${phone.trim()}
Email: ${email.trim()}
Delivery Address/Location: ${address.trim()}
Reference Code: ${paymentIssue.reference}

*Items Purchased:*
${itemsSummary}

*Total:* ₦${subtotal.toLocaleString('en-NG')}

Please assist with verifying this order. Thank you!`;

    return `https://wa.me/${NBLX_WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
  };

  // ======================================================
  // COPY REFERENCE
  // ======================================================

  const copyReference = () => {
    navigator.clipboard.writeText(
      paymentIssue.reference
    );

    toast.success(
      'Transaction reference copied!',
      {
        id: 'reference-copied',
      }
    );
  };

  // ======================================================
  // UI
  // ======================================================

  return (
    <div className='min-h-screen bg-white text-black px-5 py-10'>
      <div className='max-w-5xl mx-auto'>

        <h1 className='text-2xl font-bold mb-8'>
          Checkout
        </h1>

        <div className='grid md:grid-cols-2 gap-8'>

          {/* ==================================================
              CUSTOMER DETAILS
          ================================================== */}

          <div>

            <h2 className='text-lg font-bold mb-4'>
              Customer Information
            </h2>

            <div className='space-y-4'>

              {/* FULL NAME */}

              <div>

                <input
                  type='text'
                  placeholder='Full Name'
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);

                    if (errors.fullName) {
                      setErrors((prev) => ({
                        ...prev,
                        fullName: '',
                      }));
                    }
                  }}
                  className={`w-full border rounded-lg px-4 py-3 outline-none transition ${
                    errors.fullName
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-black'
                  }`}
                />

                {errors.fullName && (
                  <p className='text-xs text-red-500 mt-1 font-medium'>
                    {errors.fullName}
                  </p>
                )}

              </div>

              {/* EMAIL */}

              <div>

                <input
                  type='email'
                  placeholder='Email Address (@gmail.com)'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);

                    if (errors.email) {
                      setErrors((prev) => ({
                        ...prev,
                        email: '',
                      }));
                    }
                  }}
                  className={`w-full border rounded-lg px-4 py-3 outline-none transition ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-black'
                  }`}
                />

                {errors.email && (
                  <p className='text-xs text-red-500 mt-1 font-medium'>
                    {errors.email}
                  </p>
                )}

              </div>

              {/* PHONE */}

              <div>

                <input
                  type='tel'
                  placeholder='Phone Number'
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);

                    if (errors.phone) {
                      setErrors((prev) => ({
                        ...prev,
                        phone: '',
                      }));
                    }
                  }}
                  className={`w-full border rounded-lg px-4 py-3 outline-none transition ${
                    errors.phone
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-black'
                  }`}
                />

                {errors.phone && (
                  <p className='text-xs text-red-500 mt-1 font-medium'>
                    {errors.phone}
                  </p>
                )}

              </div>

              {/* DELIVERY ADDRESS */}

              <div>

                <textarea
                  placeholder='Delivery Address'
                  rows='4'
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);

                    if (errors.address) {
                      setErrors((prev) => ({
                        ...prev,
                        address: '',
                      }));
                    }
                  }}
                  className={`w-full border rounded-lg px-4 py-3 outline-none transition resize-none ${
                    errors.address
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-black'
                  }`}
                />

                {errors.address && (
                  <p className='text-xs text-red-500 mt-1 font-medium'>
                    {errors.address}
                  </p>
                )}

              </div>

            </div>
          </div>

          {/* ==================================================
              ORDER SUMMARY
          ================================================== */}

          <div>

            <h2 className='text-lg font-bold mb-4'>
              Order Summary
            </h2>

            <div className='border border-gray-200 rounded-lg p-5'>

              {cartItems.length === 0 ? (
                <p className='text-gray-500 text-sm py-4'>
                  Your cart is empty.
                </p>
              ) : (
                cartItems.map((item, index) => (
                  <div
                    key={`${item.id}-${item.selectedSize}-${index}`}
                    className='flex justify-between gap-4 mb-4 pb-4 border-b border-gray-100'
                  >

                    <div>

                      <p className='font-semibold text-sm'>
                        {item.name}
                      </p>

                      {item.selectedSize && (
                        <p className='text-xs text-gray-500'>
                          Size: {item.selectedSize}
                        </p>
                      )}

                      <p className='text-xs text-gray-500'>
                        Quantity: {item.quantity}
                      </p>

                    </div>

                    <p className='font-semibold text-sm'>
                      ₦
                      {(
                        Number(item.price || 0) *
                        Number(item.quantity || 0)
                      ).toLocaleString('en-NG')}
                    </p>

                  </div>
                ))
              )}

              <div className='flex justify-between items-center pt-2'>

                <p className='text-lg font-semibold'>
                  Total
                </p>

                <p className='text-lg font-bold'>
                  ₦ {subtotal.toLocaleString('en-NG')}
                </p>

              </div>

              {/* PAYSTACK */}

              <button
                type='button'
                onClick={handlePayment}
                disabled={
                  loading ||
                  cartItems.length === 0
                }
                className='w-full bg-black text-white py-3 mt-5 font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50'
              >
                {loading
                  ? 'Processing...'
                  : 'Pay with Paystack'}
              </button>

              {/* FLUTTERWAVE */}

              <button
                type='button'
                onClick={handleFlutterwavePayment}
                disabled={
                  loading ||
                  cartItems.length === 0
                }
                className='w-full bg-gray-100 text-black py-3 mt-3 font-bold rounded-lg hover:bg-gray-200 transition disabled:opacity-50'
              >
                {loading
                  ? 'Processing...'
                  : 'Pay with Flutterwave'}
              </button>

            </div>
          </div>

        </div>
      </div>

      {/* ======================================================
          VERIFICATION ISSUES MODAL
      ====================================================== */}

      {paymentIssue.show && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>

          {/* BACKDROP */}

          <div
            onClick={() =>
              setPaymentIssue({
                show: false,
                reference: '',
              })
            }
            className='absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity'
          />

          {/* MODAL */}

          <div className='relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 md:p-8 z-10 text-center'>

            <div className='w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold'>
              !
            </div>

            <h2 className='text-xl font-bold text-black mb-2'>
              Payment Pending Verification
            </h2>

            <p className='text-sm text-gray-600 leading-relaxed mb-6'>
              Your payment was received, but
              auto-verification is taking longer than
              usual. Click below to send your purchase
              summary directly to our WhatsApp support
              team.
            </p>

            {/* REFERENCE */}

            <div className='bg-gray-50 border border-gray-200 rounded-xl p-3 mb-6 text-left'>

              <p className='text-xs text-gray-500 font-medium'>
                Reference Code:
              </p>

              <div className='flex justify-between items-center mt-1'>

                <span className='font-mono text-sm font-bold text-black'>
                  {paymentIssue.reference}
                </span>

                <button
                  onClick={copyReference}
                  className='text-xs text-black font-semibold underline hover:opacity-80'
                >
                  Copy
                </button>

              </div>
            </div>

            {/* ACTIONS */}

            <div className='space-y-3'>

              <a
                href={generateWhatsAppLink()}
                target='_blank'
                rel='noopener noreferrer'
                className='block w-full bg-emerald-600 text-white py-3.5 rounded-xl font-medium text-sm hover:bg-emerald-700 transition'
              >
                Send Order Details via WhatsApp
              </a>

              <button
                onClick={() =>
                  setPaymentIssue({
                    show: false,
                    reference: '',
                  })
                }
                className='w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium text-sm hover:bg-gray-200 transition'
              >
                Close & Return
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;