// import React, { useState } from 'react';
// import { useCart } from '../Context/cartContext';
// import { useNavigate } from 'react-router-dom';
// import Paystack from '@paystack/inline-js';
// import toast from 'react-hot-toast';

// const PAYSTACK_PUBLIC_KEY = 'pk_test_2eb7f8de0acd8210d035009e9a2df49bcc11493d';

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
//     (total, item) => total + Number(item.price || 0) * Number(item.quantity || 0),
//     0,
//   );

//   // ======================================================
//   // EMAIL VALIDATION
//   // ======================================================

//   const isValidEmail = (email) => {
//     return /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email.trim());
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
//       newErrors.fullName = 'Please enter a valid full name.';
//     }

//     // 2. Email Validation
//     if (!email.trim()) {
//       newErrors.email = 'Email address is required.';
//     } else if (!isValidEmail(email)) {
//       newErrors.email = 'Please enter a valid Gmail address.';
//     }

//     // 3. Phone Number Validation
//     const phoneRegex = /^\+?[0-9\s-]{7,15}$/;

//     if (!phone.trim()) {
//       newErrors.phone = 'Phone number is required.';
//     } else if (!phoneRegex.test(phone.trim())) {
//       newErrors.phone = 'Please enter a valid phone number.';
//     }

//     // 4. Delivery Address Validation
//     if (!address.trim()) {
//       newErrors.address = 'Delivery address is required.';
//     } else if (address.trim().length < 5) {
//       newErrors.address = 'Please enter a complete delivery address.';
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   // ======================================================
//   // PAYSTACK PAYMENT
//   // ======================================================

//   const handlePayment = () => {
//     if (cartItems.length === 0) {
//       return toast.error('Your cart is empty.', {
//         id: 'cart-empty',
//       });
//     }

//     if (!validateForm()) {
//       return toast.error('Fill in the form before proceeding.', {
//         id: 'form-validation',
//       });
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
//               expectedAmount: subtotal,

//               customerDetails: {
//                 fullName: fullName.trim(),
//                 email: email.trim(),
//                 phone: phone.trim(),
//                 address: address.trim(),
//               },

//               items: cartItems.map((item) => ({
//                 id: item.id,
//                 name: item.name,
//                 price: Number(item.price || 0),
//                 quantity: Number(item.quantity || 1),
//                 selectedSize: item.selectedSize || '',
//                 selectedColor: item.selectedColor || item.color || '',
//                 image: item.image || item.images?.[0] || '',
//               })),
//             }),
//           });

//           const result = await response.json();

//           if (!response.ok || !result.success) {
//             throw new Error('Verification failed on server');
//           }

//           toast.success('Payment verified successfully!', {
//             id: 'payment-success',
//           });

//           clearCart();

//           setLoading(false);

//           navigate('/order-success');
//         } catch (error) {
//           console.error('Verification error:', error);

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
//   // FLUTTERWAVE PAYMENT
//   // ======================================================

//   const handleFlutterwavePayment = async () => {
//     // ======================================================
//     // CHECK CART
//     // ======================================================

//     if (cartItems.length === 0) {
//       return toast.error('Your cart is empty.', {
//         id: 'cart-empty',
//       });
//     }

//     // ======================================================
//     // VALIDATE FORM
//     // ======================================================

//     if (!validateForm()) {
//       return toast.error('Please fix the errors in the form before proceeding.', {
//         id: 'form-validation',
//       });
//     }

//     // ======================================================
//     // START LOADING
//     // ======================================================

//     setLoading(true);

//     try {
//       const response = await fetch('/api/flutterwave-payment', {
//         method: 'POST',

//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//         },

//         body: JSON.stringify({
//           amount: Number(subtotal),

//           customerDetails: {
//             fullName: fullName.trim(),
//             email: email.trim(),
//             phone: phone.trim(),
//             address: address.trim(),
//           },
//         }),
//       });

//       // ====================================================
//       // READ RESPONSE SAFELY
//       // ====================================================

//       const responseText = await response.text();

//       let result = null;

//       if (responseText.trim()) {
//         try {
//           result = JSON.parse(responseText);
//         } catch {
//           console.error('Invalid JSON response from Flutterwave API:', responseText);

//           throw new Error('The payment server returned an invalid response.');
//         }
//       }

//       // ====================================================
//       // CHECK SERVER RESPONSE
//       // ====================================================

//       if (!response.ok) {
//         throw new Error(result?.message || `Payment server error (${response.status}).`);
//       }

//       if (!result) {
//         throw new Error('The payment server returned an empty response.');
//       }

//       if (!result.success) {
//         throw new Error(result.message || 'Unable to initialize Flutterwave payment.');
//       }

//       if (!result.link) {
//         throw new Error('Flutterwave payment link was not returned.');
//       }

//       // ====================================================
//       // REDIRECT TO FLUTTERWAVE
//       // ====================================================

//       window.location.href = result.link;
//     } catch (error) {
//       console.error('Flutterwave payment error:', error);

//       setLoading(false);

//       toast.error(error.message || 'Unable to start Flutterwave payment.', {
//         id: 'flutterwave-error',
//       });
//     }
//   };

//   // ======================================================
//   // WHATSAPP ORDER MESSAGE
//   // ======================================================

//   const generateWhatsAppLink = () => {
//     const itemsSummary = cartItems
//       .map(
//         (item) =>
//           `• ${item.name}${
//             item.selectedSize ? ` (Size: ${item.selectedSize})` : ''
//           } x${item.quantity} - ₦${(
//             Number(item.price || 0) * Number(item.quantity || 0)
//           ).toLocaleString('en-NG')}`,
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

//     return `https://wa.me/${NBLX_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
//   };

//   // ======================================================
//   // COPY REFERENCE
//   // ======================================================

//   const copyReference = () => {
//     navigator.clipboard.writeText(paymentIssue.reference);

//     toast.success('Transaction reference copied!', {
//       id: 'reference-copied',
//     });
//   };

//   // ======================================================
//   // UI
//   // ======================================================

//   return (
//     <div className='min-h-screen bg-white text-black px-5 py-10'>
//       <div className='max-w-5xl mx-auto'>
//         <h1 className='text-2xl font-bold mb-8'>Checkout</h1>

//         <div className='grid md:grid-cols-2 gap-8'>
//           {/* ==================================================
//               CUSTOMER DETAILS
//           ================================================== */}

//           <div>
//             <h2 className='text-lg font-bold mb-4'>Customer Information</h2>

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
//                   <p className='text-xs text-red-500 mt-1 font-medium'>{errors.fullName}</p>
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
//                   <p className='text-xs text-red-500 mt-1 font-medium'>{errors.email}</p>
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
//                   <p className='text-xs text-red-500 mt-1 font-medium'>{errors.phone}</p>
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
//                   <p className='text-xs text-red-500 mt-1 font-medium'>{errors.address}</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* ==================================================
//               ORDER SUMMARY
//           ================================================== */}

//           <div>
//             <h2 className='text-lg font-bold mb-4'>Order Summary</h2>

//             <div className='border border-gray-200 rounded-lg p-5'>
//               {cartItems.length === 0 ? (
//                 <p className='text-gray-500 text-sm py-4'>Your cart is empty.</p>
//               ) : (
//                 cartItems.map((item, index) => (
//                   <div
//                     key={`${item.id}-${item.selectedSize}-${index}`}
//                     className='flex justify-between gap-4 mb-4 pb-4 border-b border-gray-100'
//                   >
//                     <div>
//                       <p className='font-semibold text-sm'>{item.name}</p>

//                       {item.selectedSize && (
//                         <p className='text-xs text-gray-500'>Size: {item.selectedSize}</p>
//                       )}

//                       <p className='text-xs text-gray-500'>Quantity: {item.quantity}</p>
//                     </div>

//                     <p className='font-semibold text-sm'>
//                       ₦
//                       {(Number(item.price || 0) * Number(item.quantity || 0)).toLocaleString(
//                         'en-NG',
//                       )}
//                     </p>
//                   </div>
//                 ))
//               )}

//               <div className='flex justify-between items-center pt-2'>
//                 <p className='text-lg font-semibold'>Total</p>

//                 <p className='text-lg font-bold'>₦ {subtotal.toLocaleString('en-NG')}</p>
//               </div>

//               {/* PAYSTACK */}

//               <button
//                 type='button'
//                 onClick={handlePayment}
//                 disabled={loading || cartItems.length === 0}
//                 className='w-full bg-black text-white py-3 mt-5 font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50'
//               >
//                 {loading ? 'Processing...' : 'Pay with Paystack'}
//               </button>

//               {/* FLUTTERWAVE */}

//               <button
//                 type='button'
//                 onClick={handleFlutterwavePayment}
//                 disabled={loading || cartItems.length === 0}
//                 className='w-full bg-gray-100 text-black py-3 mt-3 font-bold rounded-lg hover:bg-gray-200 transition disabled:opacity-50'
//               >
//                 {loading ? 'Processing...' : 'Pay with Flutterwave'}
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

//             <h2 className='text-xl font-bold text-black mb-2'>Payment Pending Verification</h2>

//             <p className='text-sm text-gray-600 leading-relaxed mb-6'>
//               Your payment was received, but auto-verification is taking longer than usual.
//               Click below to send your purchase summary directly to our WhatsApp support team.
//             </p>

//             {/* REFERENCE */}

//             <div className='bg-gray-50 border border-gray-200 rounded-xl p-3 mb-6 text-left'>
//               <p className='text-xs text-gray-500 font-medium'>Reference Code:</p>

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

// Checkout.jsx

import React, { useState } from 'react';
import { useCart } from '../Context/cartContext';
import { useNavigate } from 'react-router-dom';
import Paystack from '@paystack/inline-js';
import toast from 'react-hot-toast';
import { auth } from '../firebase';

const PAYSTACK_PUBLIC_KEY = 'pk_test_2eb7f8de0acd8210d035009e9a2df49bcc11493d';

const NBLX_WHATSAPP_NUMBER = '2349117098144';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [paymentIssue, setPaymentIssue] = useState({
    show: false,
    reference: '',
  });

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price || 0) * Number(item.quantity || 0),
    0,
  );

  const isValidEmail = (value) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(value.trim());

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;
    const phoneRegex = /^\+?[0-9\s-]{7,15}$/;

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (!nameRegex.test(fullName.trim())) {
      newErrors.fullName = 'Please enter a valid full name.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid Gmail address.';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!address.trim()) {
      newErrors.address = 'Delivery address is required.';
    } else if (address.trim().length < 5) {
      newErrors.address = 'Please enter a complete delivery address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getCustomerDetails = () => ({
    fullName: fullName.trim(),
    email: email.trim(),
    phone: phone.trim(),
    address: address.trim(),
  });

  const getOrderItems = () =>
    cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: Number(item.price || 0),
      quantity: Number(item.quantity || 1),
      selectedSize: item.selectedSize || '',
      selectedColor: item.selectedColor || item.color || '',
      image: item.image || item.images?.[0] || '',
    }));

  // PAYSTACK
  const handlePayment = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty.', { id: 'cart-empty' });
      return;
    }

    if (!validateForm()) {
      toast.error('Fill in the form before proceeding.', {
        id: 'form-validation',
      });
      return;
    }

    setLoading(true);

    try {
      const paystack = new Paystack();

      paystack.newTransaction({
        key: PAYSTACK_PUBLIC_KEY,
        email: email.trim(),
        amount: Math.round(subtotal * 100),
        currency: 'NGN',

        onSuccess: async (transaction) => {
          try {
            const currentUser = auth.currentUser;
            const idToken = currentUser ? await currentUser.getIdToken() : null;

            const response = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
              },
              body: JSON.stringify({
                reference: transaction.reference,
                expectedAmount: subtotal,
                customerDetails: getCustomerDetails(),
                items: getOrderItems(),
              }),
            });

            const responseText = await response.text();

            let result;

            try {
              result = JSON.parse(responseText);
            } catch {
              console.error('Payment API returned invalid JSON:', responseText);
              throw new Error(
                `Payment verification API returned an invalid response (HTTP ${response.status}). Check Vercel logs.`,
              );
            }

            if (!response.ok || !result.success) {
              throw new Error(
                result.message || `Payment verification failed (HTTP ${response.status}).`,
              );
            }

            // Get the NBLX Order ID from the verified API response.
            const orderId = result.order?.orderId || result.orderId;

            if (!orderId) {
              throw new Error(
                'Payment was received, but the NBLX Order ID was not returned. Contact support with your payment reference.',
              );
            }

            const savedOrder = {
              ...(result.order || {}),
              orderId,
              reference: result.order?.reference || transaction.reference,
            };

            // Save identifiers for the success page and refresh recovery.
            localStorage.setItem('nblx_last_order_id', orderId);
            localStorage.setItem('nblx_last_payment_reference', transaction.reference);

            // Preserve the complete latest order for display on this browser.
            localStorage.setItem('nblx_last_order', JSON.stringify(savedOrder));

            toast.success('Payment verified successfully!', {
              id: 'payment-success',
            });

            clearCart();
            setLoading(false);

            navigate('/order-success', {
              state: {
                order: savedOrder,
                orderId,
                paymentReference: transaction.reference,
              },
            });
          } catch (error) {
            console.error('Payment verification error:', error);
            setLoading(false);

            setPaymentIssue({
              show: true,
              reference: transaction.reference,
            });
          }
        },

        onCancel: () => {
          setLoading(false);
          toast('Payment cancelled.', {
            id: 'payment-cancelled',
            icon: 'ℹ️',
          });
        },
      });
    } catch (error) {
      console.error('Paystack initialization error:', error);
      setLoading(false);
      toast.error('Unable to start Paystack payment.');
    }
  };

  // FLUTTERWAVE
  const handleFlutterwavePayment = async () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty.', { id: 'cart-empty' });
      return;
    }

    if (!validateForm()) {
      toast.error('Please fix the errors in the form.', {
        id: 'form-validation',
      });
      return;
    }

    setLoading(true);

    try {
      const currentUser = auth.currentUser;
      const idToken = currentUser ? await currentUser.getIdToken() : null;

      const response = await fetch('/api/flutterwave-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
        },
        body: JSON.stringify({
          amount: Number(subtotal),
          customerDetails: getCustomerDetails(),
          items: getOrderItems(),
        }),
      });

      const responseText = await response.text();
      let result = null;

      if (responseText.trim()) {
        try {
          result = JSON.parse(responseText);
        } catch {
          throw new Error('The payment server returned invalid data.');
        }
      }

      if (!response.ok || !result?.success || !result?.link) {
        throw new Error(result?.message || 'Unable to initialize Flutterwave payment.');
      }

      // The Flutterwave callback must verify the payment and save
      // the order before sending the customer to OrderSuccess.
      window.location.href = result.link;
    } catch (error) {
      console.error('Flutterwave payment error:', error);
      setLoading(false);
      toast.error(error.message || 'Unable to start Flutterwave payment.');
    }
  };

  const generateWhatsAppLink = () => {
    const itemsSummary = cartItems
      .map(
        (item) =>
          `• ${item.name}${
            item.selectedSize ? ` (Size: ${item.selectedSize})` : ''
          } x${item.quantity} - ₦${(
            Number(item.price || 0) * Number(item.quantity || 0)
          ).toLocaleString('en-NG')}`,
      )
      .join('\n');

    const message = `Hello NBLX Support,

My payment needs manual verification.

Order Details:
Name: ${fullName.trim()}
Phone: ${phone.trim()}
Email: ${email.trim()}
Delivery Address: ${address.trim()}
Payment Reference: ${paymentIssue.reference}

Items:
${itemsSummary}

Total: ₦${subtotal.toLocaleString('en-NG')}

Please assist with verifying my order. Thank you!`;

    return `https://wa.me/${NBLX_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const copyReference = async () => {
    try {
      await navigator.clipboard.writeText(paymentIssue.reference);
      toast.success('Transaction reference copied!');
    } catch {
      toast.error('Unable to copy the reference.');
    }
  };

  const inputClass = (field) =>
    `w-full border rounded-lg px-4 py-3 outline-none transition ${
      errors[field]
        ? 'border-red-500 focus:border-red-500'
        : 'border-gray-300 focus:border-black'
    }`;

  const clearFieldError = (field) => {
    if (errors[field]) {
      setErrors((previous) => ({ ...previous, [field]: '' }));
    }
  };

  return (
    <div className='min-h-screen bg-white text-black px-5 py-10'>
      <div className='max-w-5xl mx-auto'>
        <h1 className='text-2xl font-bold mb-8'>Checkout</h1>

        <div className='grid md:grid-cols-2 gap-8'>
          <div>
            <h2 className='text-lg font-bold mb-4'>Customer Information</h2>

            <div className='space-y-4'>
              <div>
                <input
                  type='text'
                  placeholder='Full Name'
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    clearFieldError('fullName');
                  }}
                  className={inputClass('fullName')}
                />
                {errors.fullName && (
                  <p className='text-xs text-red-500 mt-1 font-medium'>{errors.fullName}</p>
                )}
              </div>

              <div>
                <input
                  type='email'
                  placeholder='Email Address (@gmail.com)'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearFieldError('email');
                  }}
                  className={inputClass('email')}
                />
                {errors.email && (
                  <p className='text-xs text-red-500 mt-1 font-medium'>{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type='tel'
                  placeholder='Phone Number'
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    clearFieldError('phone');
                  }}
                  className={inputClass('phone')}
                />
                {errors.phone && (
                  <p className='text-xs text-red-500 mt-1 font-medium'>{errors.phone}</p>
                )}
              </div>

              <div>
                <textarea
                  placeholder='Delivery Address'
                  rows='4'
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    clearFieldError('address');
                  }}
                  className={`${inputClass('address')} resize-none`}
                />
                {errors.address && (
                  <p className='text-xs text-red-500 mt-1 font-medium'>{errors.address}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h2 className='text-lg font-bold mb-4'>Order Summary</h2>

            <div className='border border-gray-200 rounded-lg p-5'>
              {cartItems.length === 0 ? (
                <p className='text-gray-500 text-sm py-4'>Your cart is empty.</p>
              ) : (
                cartItems.map((item, index) => (
                  <div
                    key={`${item.id}-${item.selectedSize}-${index}`}
                    className='flex justify-between gap-4 mb-4 pb-4 border-b border-gray-100'
                  >
                    <div>
                      <p className='font-semibold text-sm'>{item.name}</p>
                      {item.selectedSize && (
                        <p className='text-xs text-gray-500'>Size: {item.selectedSize}</p>
                      )}
                      <p className='text-xs text-gray-500'>Quantity: {item.quantity}</p>
                    </div>

                    <p className='font-semibold text-sm'>
                      ₦
                      {(Number(item.price || 0) * Number(item.quantity || 0)).toLocaleString(
                        'en-NG',
                      )}
                    </p>
                  </div>
                ))
              )}

              <div className='flex justify-between items-center pt-2'>
                <p className='text-lg font-semibold'>Total</p>
                <p className='text-lg font-bold'>₦ {subtotal.toLocaleString('en-NG')}</p>
              </div>

              <button
                type='button'
                onClick={handlePayment}
                disabled={loading || cartItems.length === 0}
                className='w-full bg-black text-white py-3 mt-5 font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50'
              >
                {loading ? 'Processing...' : 'Pay with Paystack'}
              </button>

              <button
                type='button'
                onClick={handleFlutterwavePayment}
                disabled={loading || cartItems.length === 0}
                className='w-full bg-gray-100 text-black py-3 mt-3 font-bold rounded-lg hover:bg-gray-200 transition disabled:opacity-50'
              >
                {loading ? 'Processing...' : 'Pay with Flutterwave'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {paymentIssue.show && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          <button
            type='button'
            aria-label='Close verification notice'
            onClick={() => setPaymentIssue({ show: false, reference: '' })}
            className='absolute inset-0 bg-black/60 backdrop-blur-sm'
          />

          <div className='relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 md:p-8 z-10 text-center'>
            <div className='w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold'>
              !
            </div>

            <h2 className='text-xl font-bold text-black mb-2'>Payment Pending Verification</h2>

            <p className='text-sm text-gray-600 leading-relaxed mb-6'>
              Your payment may have succeeded, but automatic verification did not finish.
              Contact support with your payment reference. Please do not pay again until the
              transaction is checked.
            </p>

            <div className='bg-gray-50 border border-gray-200 rounded-xl p-3 mb-6 text-left'>
              <p className='text-xs text-gray-500 font-medium'>Payment Reference</p>
              <div className='flex justify-between items-center mt-1 gap-3'>
                <span className='font-mono text-sm font-bold break-all'>
                  {paymentIssue.reference}
                </span>
                <button
                  type='button'
                  onClick={copyReference}
                  className='text-xs font-semibold underline shrink-0'
                >
                  Copy
                </button>
              </div>
            </div>

            <div className='space-y-3'>
              <a
                href={generateWhatsAppLink()}
                target='_blank'
                rel='noopener noreferrer'
                className='block w-full bg-emerald-600 text-white py-3.5 rounded-xl font-medium text-sm hover:bg-emerald-700 transition'
              >
                Contact Support on WhatsApp
              </a>

              <button
                type='button'
                onClick={() => setPaymentIssue({ show: false, reference: '' })}
                className='w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium text-sm hover:bg-gray-200 transition'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
