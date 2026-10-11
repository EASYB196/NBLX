
import React, { useState } from 'react';
import { useCart } from '../Context/cartContext';
import { useNavigate } from 'react-router-dom';
import Paystack from '@paystack/inline-js';
import toast from 'react-hot-toast';
import { auth } from '../firebase';

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

  const [errors, setErrors] = useState({});

  const [paymentIssue, setPaymentIssue] = useState({
    show: false,
    reference: '',
  });

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) * Number(item.quantity || 0),
    0,
  );

  // EMAIL VALIDATION
  const isValidEmail = (value) =>
    /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(value.trim());

  // FORM VALIDATION
  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;
    const phoneRegex = /^\+?[0-9\s()-]{7,20}$/;

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

  // SAFE JSON RESPONSE PARSER
  const readApiResponse = async (response) => {
    const responseText = await response.text();

    let result = {};

    if (responseText.trim()) {
      try {
        result = JSON.parse(responseText);
      } catch {
        console.error(
          'API returned invalid JSON:',
          response.status,
          responseText,
        );

        throw new Error(
          `Server returned an invalid response (HTTP ${response.status}).`,
        );
      }
    }

    if (!response.ok) {
      throw new Error(
        result.message || `Server error (HTTP ${response.status}).`,
      );
    }

    return result;
  };

  // BUILD ORDER ITEMS FOR THE BACKEND
  const getOrderItems = () =>
    cartItems.map((item) => ({
      id: String(item.id || ''),
      name: String(item.name || 'NBLX Product'),
      price: Number(item.price || 0),
      quantity: Number(item.quantity || 1),
      selectedSize: item.selectedSize || item.size || '',
      selectedColor: item.selectedColor || item.color || 'Default',
      image: item.image || item.images?.[0] || '',
      images: item.images || [],
    }));

  // PAYSTACK PAYMENT
  const handlePayment = () => {
    if (loading) return;

    if (!cartItems.length) {
      toast.error('Your cart is empty.', { id: 'cart-empty' });
      return;
    }

    if (!validateForm()) {
      toast.error('Please fix the errors in the form.', {
        id: 'form-validation',
      });
      return;
    }

    if (!Number.isFinite(subtotal) || subtotal <= 0) {
      toast.error('Your order total is invalid.');
      return;
    }

    setLoading(true);

    try {
      const paystack = new Paystack();

      paystack.newTransaction({
        key: PAYSTACK_PUBLIC_KEY,
        email: email.trim().toLowerCase(),
        amount: Math.round(subtotal * 100),
        currency: 'NGN',

        onSuccess: async (transaction) => {
          const reference = transaction?.reference;

          if (!reference) {
            setLoading(false);
            toast.error('Payment reference was not returned.');
            return;
          }

          // Keep the reference in case verification needs investigation.
          localStorage.setItem(
            'nblx_last_payment_reference',
            reference,
          );

          try {
            const customerDetails = {
              fullName: fullName.trim(),
              email: email.trim().toLowerCase(),
              phone: phone.trim(),
              address: address.trim(),
            };

            const user = auth.currentUser;
            const headers = {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            };

            // Include Firebase identity when the customer is logged in.
            if (user) {
              const idToken = await user.getIdToken();
              headers.Authorization = `Bearer ${idToken}`;
            }

            const response = await fetch('/api/verify-payment', {
              method: 'POST',
              headers,
              body: JSON.stringify({
                reference,
                customerDetails,
                items: getOrderItems(),
                expectedAmount: subtotal,
              }),
            });

            const result = await readApiResponse(response);

            if (!result.success || !result.order?.orderId) {
              throw new Error(
                result.message ||
                  'Payment was received, but the order ID was not returned.',
              );
            }

            const savedOrder = result.order;
            const orderId = savedOrder.orderId;

            // Store order details for the success page and recovery.
            localStorage.setItem('nblx_last_order_id', orderId);
            localStorage.setItem(
              'nblx_last_payment_reference',
              reference,
            );
            localStorage.setItem(
              'nblx_last_order',
              JSON.stringify(savedOrder),
            );

            clearCart();
            setLoading(false);

            toast.success('Payment verified successfully!', {
              id: 'payment-success',
            });

            navigate('/order-success', {
              state: {
                order: savedOrder,
                orderId,
                paymentReference: reference,
              },
            });
          } catch (error) {
            console.error('Payment verification error:', error);

            setLoading(false);

            setPaymentIssue({
              show: true,
              reference,
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
      console.error('Unable to initialize Paystack:', error);
      setLoading(false);

      toast.error(
        error.message || 'Unable to start Paystack payment.',
      );
    }
  };

  // FLUTTERWAVE PAYMENT INITIALIZATION
  const handleFlutterwavePayment = async () => {
    if (loading) return;

    if (!cartItems.length) {
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
      const response = await fetch('/api/flutterwave-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          amount: Number(subtotal),
          customerDetails: {
            fullName: fullName.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            address: address.trim(),
          },
        }),
      });

      const result = await readApiResponse(response);

      if (!result.success || !result.link) {
        throw new Error(
          result.message || 'Flutterwave payment link was not returned.',
        );
      }

      // Redirect to the hosted Flutterwave checkout.
      window.location.href = result.link;
    } catch (error) {
      console.error('Flutterwave payment error:', error);
      setLoading(false);

      toast.error(
        error.message || 'Unable to start Flutterwave payment.',
      );
    }
  };

  // WHATSAPP SUPPORT MESSAGE
  const generateWhatsAppLink = () => {
    const itemsSummary = cartItems
      .map((item) => {
        const size = item.selectedSize || item.size;
        const color = item.selectedColor || item.color;

        return (
          `• ${item.name}` +
          (size ? ` (Size: ${size})` : '') +
          (color ? ` (Color: ${color})` : '') +
          ` x${item.quantity} - ₦${(
            Number(item.price || 0) * Number(item.quantity || 0)
          ).toLocaleString('en-NG')}`
        );
      })
      .join('\n');

    const message = `Hello NBLX Support,

My payment requires verification.

Order Details:
Name: ${fullName.trim()}
Phone: ${phone.trim()}
Email: ${email.trim()}
Delivery Address: ${address.trim()}
Payment Reference: ${paymentIssue.reference}

Items:
${itemsSummary}

Total: ₦${subtotal.toLocaleString('en-NG')}

Please help me confirm my payment and order. Thank you!`;

    return `https://wa.me/${NBLX_WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;
  };

  // COPY PAYMENT REFERENCE
  const copyReference = async () => {
    try {
      await navigator.clipboard.writeText(paymentIssue.reference);

      toast.success('Payment reference copied!', {
        id: 'reference-copied',
      });
    } catch {
      toast.error('Unable to copy the reference. Please copy it manually.');
    }
  };

  // CLOSE VERIFICATION MODAL
  const closePaymentIssue = () => {
    setPaymentIssue({
      show: false,
      reference: '',
    });
  };

  return (
    <div className="min-h-screen bg-white px-5 py-10 text-black">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-2xl font-bold">Checkout</h1>

        <div className="grid gap-8 md:grid-cols-2">
          {/* CUSTOMER DETAILS */}
          <div>
            <h2 className="mb-4 text-lg font-bold">
              Customer Information
            </h2>

            <div className="space-y-4">
              {/* FULL NAME */}
              <div>
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      fullName: '',
                    }));
                  }}
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition ${
                    errors.fullName
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-black'
                  }`}
                />

                {errors.fullName && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="Email Address (@gmail.com)"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      email: '',
                    }));
                  }}
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-black'
                  }`}
                />

                {errors.email && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* PHONE */}
              <div>
                <input
                  type="tel"
                  autoComplete="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      phone: '',
                    }));
                  }}
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition ${
                    errors.phone
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-black'
                  }`}
                />

                {errors.phone && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* DELIVERY ADDRESS */}
              <div>
                <textarea
                  autoComplete="street-address"
                  placeholder="Delivery Address"
                  rows={4}
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      address: '',
                    }));
                  }}
                  className={`w-full resize-none rounded-lg border px-4 py-3 outline-none transition ${
                    errors.address
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-black'
                  }`}
                />

                {errors.address && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                    {errors.address}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div>
            <h2 className="mb-4 text-lg font-bold">Order Summary</h2>

            <div className="rounded-lg border border-gray-200 p-5">
              {cartItems.length === 0 ? (
                <p className="py-4 text-sm text-gray-500">
                  Your cart is empty.
                </p>
              ) : (
                cartItems.map((item, index) => (
                  <div
                    key={`${item.id}-${item.selectedColor || item.color || ''}-${item.selectedSize || item.size || ''}-${index}`}
                    className="mb-4 flex justify-between gap-4 border-b border-gray-100 pb-4"
                  >
                    <div>
                      <p className="text-sm font-semibold">
                        {item.name}
                      </p>

                      {(item.selectedSize || item.size) && (
                        <p className="text-xs text-gray-500">
                          Size: {item.selectedSize || item.size}
                        </p>
                      )}

                      {(item.selectedColor || item.color) && (
                        <p className="text-xs text-gray-500">
                          Color: {item.selectedColor || item.color}
                        </p>
                      )}

                      <p className="text-xs text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm font-semibold">
                      ₦
                      {(
                        Number(item.price || 0) *
                        Number(item.quantity || 0)
                      ).toLocaleString('en-NG')}
                    </p>
                  </div>
                ))
              )}

              <div className="flex items-center justify-between pt-2">
                <p className="text-lg font-semibold">Total</p>

                <p className="text-lg font-bold">
                  ₦{subtotal.toLocaleString('en-NG')}
                </p>
              </div>

              {/* PAYSTACK */}
              <button
                type="button"
                onClick={handlePayment}
                disabled={loading || cartItems.length === 0}
                className="mt-5 w-full rounded-lg bg-black py-3 font-bold text-white transition hover:opacity-90 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Pay with Paystack'}
              </button>

              {/* FLUTTERWAVE */}
              <button
                type="button"
                onClick={handleFlutterwavePayment}
                disabled={loading || cartItems.length === 0}
                className="mt-3 w-full rounded-lg bg-gray-100 py-3 font-bold text-black transition hover:bg-gray-200 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Pay with Flutterwave'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PAYMENT VERIFICATION MODAL */}
      {paymentIssue.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* BACKDROP */}
          <button
            type="button"
            aria-label="Close payment verification dialog"
            onClick={closePaymentIssue}
            className="absolute inset-0 h-full w-full bg-black/60 backdrop-blur-sm"
          />

          {/* MODAL */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-issue-title"
            className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl md:p-8"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-2xl font-bold text-amber-600">
              !
            </div>

            <h2
              id="payment-issue-title"
              className="mb-2 text-xl font-bold text-black"
            >
              Payment Pending Verification
            </h2>

            <p className="mb-6 text-sm leading-relaxed text-gray-600">
              Your payment may have been received, but automatic
              verification did not complete. Keep your payment
              reference and contact support before attempting to pay
              again.
            </p>

            {/* PAYMENT REFERENCE */}
            <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-3 text-left">
              <p className="text-xs font-medium text-gray-500">
                Payment Reference:
              </p>

              <div className="mt-1 flex items-center justify-between gap-3">
                <span className="break-all font-mono text-sm font-bold text-black">
                  {paymentIssue.reference}
                </span>

                <button
                  type="button"
                  onClick={copyReference}
                  className="shrink-0 text-xs font-semibold text-black underline hover:opacity-80"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="space-y-3">
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-xl bg-emerald-600 py-3.5 text-sm font-medium text-white transition hover:bg-emerald-700"
              >
                Contact Support on WhatsApp
              </a>

              <button
                type="button"
                onClick={closePaymentIssue}
                className="w-full rounded-xl bg-gray-100 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
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
