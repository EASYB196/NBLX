import React, { useState } from 'react';
import {
  FaBoxOpen,
  FaCheck,
  FaChevronRight,
  FaClock,
  FaLocationDot,
  FaMagnifyingGlass,
  FaPhone,
  FaTruck,
  FaCircleExclamation,
} from 'react-icons/fa6';

import backgroundImage from '../assets/images/trax_showroom.webp';

import howTrack1 from '../assets/images/trax_showroom.webp';
import howTrack2 from '../assets/images/trax_showroom.webp';
import howTrack3 from '../assets/images/trax_showroom.webp';

/* =========================================================
   MOCK ORDERS
========================================================= */

const mockOrders = {
  'NBLX-102938': {
    id: 'NBLX-102938',
    date: 'October 1, 2026',
    status: 'In Transit',
    statusKey: 'transit',
    estimatedDelivery: 'October 5 – October 7, 2026',

    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+234 801 234 5678',
      address: '12 Example Street, Ikeja, Lagos, Nigeria',
    },

    items: [
      {
        id: 1,
        name: 'NBLX Essential Tee',
        color: 'Black',
        size: 'L',
        quantity: 1,
        price: 25000,
        image:
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 2,
        name: 'NBLX Essential Pants',
        color: 'Black',
        size: 'M',
        quantity: 1,
        price: 35000,
        image:
          'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=300&q=80',
      },
    ],

    subtotal: 60000,
    shipping: 3000,

    updates: [
      {
        date: 'October 2, 2026',
        time: '10:42 AM',
        title: 'Package in transit',
        description:
          'Your package has left the shipping facility and is currently on its way to the delivery destination.',
      },
      {
        date: 'October 2, 2026',
        time: '7:18 AM',
        title: 'Package received at shipping facility',
        description:
          'Your package has been received and processed at the shipping facility.',
      },
      {
        date: 'October 1, 2026',
        time: '4:32 PM',
        title: 'Order shipped',
        description:
          'Your order has been handed over to the shipping carrier.',
      },
      {
        date: 'October 1, 2026',
        time: '1:12 PM',
        title: 'Order confirmed',
        description:
          'Your order has been successfully confirmed and is being prepared.',
      },
    ],
  },

  'NBLX-123456': {
    id: 'NBLX-123456',
    date: 'September 29, 2026',
    status: 'Delivered',
    statusKey: 'delivered',
    estimatedDelivery: 'Delivered September 30, 2026',

    customer: {
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '+234 809 876 5432',
      address: '24 Admiralty Way, Lekki, Lagos, Nigeria',
    },

    items: [
      {
        id: 1,
        name: 'NBLX Classic Hoodie',
        color: 'Grey',
        size: 'M',
        quantity: 1,
        price: 45000,
        image:
          'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80',
      },
    ],

    subtotal: 45000,
    shipping: 3000,

    updates: [
      {
        date: 'September 30, 2026',
        time: '2:15 PM',
        title: 'Delivered',
        description: 'Your NBLX order has been successfully delivered.',
      },
      {
        date: 'September 30, 2026',
        time: '9:30 AM',
        title: 'Out for delivery',
        description:
          'Your package is with the delivery agent and is on its way to you.',
      },
      {
        date: 'September 29, 2026',
        time: '5:20 PM',
        title: 'Package in transit',
        description:
          'Your package is currently on its way to the destination.',
      },
      {
        date: 'September 29, 2026',
        time: '10:00 AM',
        title: 'Order shipped',
        description:
          'Your order has been handed over to the shipping carrier.',
      },
      {
        date: 'September 29, 2026',
        time: '8:30 AM',
        title: 'Order confirmed',
        description:
          'Your order has been successfully confirmed and is being prepared.',
      },
    ],
  },
};

/* =========================================================
   TRACKING STEPS
========================================================= */

const trackingSteps = [
  {
    key: 'confirmed',
    label: 'Order Confirmed',
    icon: FaCheck,
  },
  {
    key: 'processing',
    label: 'Processing',
    icon: FaBoxOpen,
  },
  {
    key: 'shipped',
    label: 'Shipped',
    icon: FaTruck,
  },
  {
    key: 'transit',
    label: 'In Transit',
    icon: FaLocationDot,
  },
  {
    key: 'out_for_delivery',
    label: 'Out for Delivery',
    icon: FaTruck,
  },
  {
    key: 'delivered',
    label: 'Delivered',
    icon: FaCheck,
  },
];

const statusOrder = [
  'confirmed',
  'processing',
  'shipped',
  'transit',
  'out_for_delivery',
  'delivered',
];

/* =========================================================
   HELPERS
========================================================= */

const formatPrice = (price) =>
  `₦${Number(price || 0).toLocaleString('en-NG')}`;

const normalizeTrackingNumber = (value) => {
  return value
    .trim()
    .toUpperCase()
    .replace(/^#/, '')
    .replace(/\s+/g, '');
};

const getStepIndex = (status) => {
  const index = statusOrder.indexOf(status);

  return index === -1 ? 0 : index;
};

const getStatusDescription = (status) => {
  switch (status) {
    case 'confirmed':
      return 'Your order has been successfully confirmed.';

    case 'processing':
      return 'Your order is currently being prepared.';

    case 'shipped':
      return 'Your order has been handed over to the shipping carrier.';

    case 'transit':
      return 'Your package is currently on its way to the delivery destination.';

    case 'out_for_delivery':
      return 'Your package is with the delivery agent and is on its way to you.';

    case 'delivered':
      return 'Your NBLX order has been successfully delivered.';

    default:
      return 'Your order is being processed.';
  }
};

/* =========================================================
   STATUS TIMELINE
========================================================= */

function StatusTimeline({ order }) {
  const currentIndex = getStepIndex(order.statusKey);

  return (
    <div className='mt-8'>
      {/* DESKTOP TIMELINE */}
      <div className='hidden md:block'>
        <div className='relative px-5'>
          <div className='absolute left-10 right-10 top-5 h-px bg-neutral-200' />

          <div
            className='absolute left-10 top-5 h-px bg-black transition-all duration-500'
            style={{
              width:
                currentIndex === 0
                  ? '0%'
                  : `calc(${(currentIndex / (trackingSteps.length - 1)) * 100}% - 0px)`,
              maxWidth: 'calc(100% - 80px)',
            }}
          />

          <div className='relative flex justify-between'>
            {trackingSteps.map((step, index) => {
              const completed = index <= currentIndex;
              const active = index === currentIndex;
              const Icon = step.icon;

              return (
                <div
                  key={step.key}
                  className='flex w-24 flex-col items-center text-center'
                >
                  <div
                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border ${
                      completed
                        ? 'border-black bg-black text-white'
                        : 'border-neutral-300 bg-white text-neutral-400'
                    } ${active ? 'ring-4 ring-neutral-100' : ''}`}
                  >
                    <Icon className='text-sm' />
                  </div>

                  <p
                    className={`mt-3 text-[11px] font-medium leading-4 ${
                      completed ? 'text-black' : 'text-neutral-400'
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MOBILE TIMELINE */}
      <div className='md:hidden'>
        <div className='relative ml-1'>
          {trackingSteps.map((step, index) => {
            const completed = index <= currentIndex;
            const active = index === currentIndex;
            const Icon = step.icon;
            const isLast = index === trackingSteps.length - 1;

            return (
              <div key={step.key} className='relative flex gap-4'>
                {!isLast && (
                  <div
                    className={`absolute left-[17px] top-9 h-[calc(100%-4px)] w-px ${
                      index < currentIndex
                        ? 'bg-black'
                        : 'bg-neutral-200'
                    }`}
                  />
                )}

                <div
                  className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                    completed
                      ? 'border-black bg-black text-white'
                      : 'border-neutral-300 bg-white text-neutral-400'
                  } ${active ? 'ring-4 ring-neutral-100' : ''}`}
                >
                  <Icon className='text-xs' />
                </div>

                <div className='pb-7 pt-1'>
                  <p
                    className={`text-sm font-semibold ${
                      completed ? 'text-black' : 'text-neutral-400'
                    }`}
                  >
                    {step.label}
                  </p>

                  {active && (
                    <p className='mt-1 text-xs leading-5 text-neutral-500'>
                      {getStatusDescription(step.key)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ORDER ITEMS
========================================================= */

function OrderItems({ items }) {
  return (
    <div>
      <h3 className='text-base font-semibold text-black'>Order Items</h3>

      <div className='mt-5 divide-y divide-neutral-100'>
        {items.map((item) => (
          <div
            key={item.id}
            className='flex gap-4 py-4 first:pt-0 last:pb-0'
          >
            <div className='h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100'>
              <img
                src={item.image}
                alt={item.name}
                className='h-full w-full object-cover'
              />
            </div>

            <div className='min-w-0 flex-1'>
              <h4 className='text-sm font-medium text-black'>
                {item.name}
              </h4>

              <div className='mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-500'>
                <span>Color: {item.color}</span>

                {item.size && <span>Size: {item.size}</span>}

                <span>Qty: {item.quantity}</span>
              </div>
            </div>

            <p className='shrink-0 text-sm font-medium text-black'>
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   ORDER TOTALS
========================================================= */

function OrderTotals({ order }) {
  const total = order.subtotal + order.shipping;

  return (
    <div className='border-t border-neutral-200 pt-5'>
      <div className='space-y-3 text-sm'>
        <div className='flex items-center justify-between text-neutral-500'>
          <span>Subtotal</span>
          <span>{formatPrice(order.subtotal)}</span>
        </div>

        <div className='flex items-center justify-between text-neutral-500'>
          <span>Shipping</span>
          <span>{formatPrice(order.shipping)}</span>
        </div>

        <div className='flex items-center justify-between border-t border-neutral-100 pt-4 text-base font-semibold text-black'>
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SHIPPING INFORMATION
========================================================= */

function ShippingInformation({ customer }) {
  return (
    <div>
      <h3 className='text-base font-semibold text-black'>
        Shipping Information
      </h3>

      <div className='mt-5 space-y-4 text-sm'>
        <div>
          <p className='text-xs uppercase tracking-wide text-neutral-400'>
            Customer
          </p>

          <p className='mt-1 text-neutral-800'>{customer.name}</p>
        </div>

        <div>
          <p className='text-xs uppercase tracking-wide text-neutral-400'>
            Email
          </p>

          <p className='mt-1 break-all text-neutral-800'>
            {customer.email}
          </p>
        </div>

        <div>
          <p className='text-xs uppercase tracking-wide text-neutral-400'>
            Phone
          </p>

          <p className='mt-1 text-neutral-800'>{customer.phone}</p>
        </div>

        <div>
          <p className='text-xs uppercase tracking-wide text-neutral-400'>
            Delivery Address
          </p>

          <p className='mt-1 leading-6 text-neutral-800'>
            {customer.address}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DELIVERY HISTORY
========================================================= */

function DeliveryHistory({ updates }) {
  return (
    <section className='border-t border-neutral-200 pt-8'>
      <div>
        <h3 className='text-base font-semibold text-black'>
          Delivery Updates
        </h3>

        <p className='mt-1 text-xs text-neutral-500'>
          Latest activity on your order
        </p>
      </div>

      <div className='mt-6 space-y-6'>
        {updates.map((update, index) => (
          <div
            key={`${update.date}-${update.time}-${index}`}
            className='flex gap-4'
          >
            <div className='flex flex-col items-center'>
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  index === 0
                    ? 'bg-black text-white'
                    : 'bg-neutral-100 text-neutral-500'
                }`}
              >
                {index === 0 ? (
                  <FaTruck className='text-xs' />
                ) : (
                  <FaCheck className='text-xs' />
                )}
              </div>

              {index !== updates.length - 1 && (
                <div className='mt-2 h-full min-h-8 w-px bg-neutral-200' />
              )}
            </div>

            <div className='pb-1'>
              <div className='flex flex-wrap items-center gap-2'>
                <h4 className='text-sm font-semibold text-black'>
                  {update.title}
                </h4>

                {index === 0 && (
                  <span className='rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-neutral-600'>
                    Latest
                  </span>
                )}
              </div>

              <p className='mt-1 text-xs text-neutral-400'>
                {update.date} · {update.time}
              </p>

              <p className='mt-2 max-w-2xl text-sm leading-6 text-neutral-500'>
                {update.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   TRACKING ERROR
========================================================= */

function TrackingError({ onRetry }) {
  return (
    <div className='mx-auto mt-8 max-w-2xl rounded-2xl border border-neutral-200 bg-white p-8 text-center sm:p-10'>
      <div className='mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-700'>
        <FaCircleExclamation className='text-xl' />
      </div>

      <h2 className='mt-5 text-lg font-semibold text-black'>
        Order not found
      </h2>

      <p className='mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500'>
        We couldn't find an order matching that tracking number. Please check
        the number and try again.
      </p>

      <button
        type='button'
        onClick={onRetry}
        className='mt-6 inline-flex h-11 items-center justify-center rounded-full bg-black px-7 text-xs font-semibold tracking-wide text-white transition hover:bg-neutral-800'
      >
        TRY AGAIN
      </button>
    </div>
  );
}

/* =========================================================
   LOADING STATE
========================================================= */

function LoadingState() {
  return (
    <div className='mx-auto mt-8 max-w-5xl space-y-5 px-4 sm:px-6 lg:px-8'>
      <div className='animate-pulse rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8'>
        <div className='h-4 w-32 rounded bg-neutral-200' />

        <div className='mt-4 h-7 w-48 rounded bg-neutral-200' />

        <div className='mt-8 h-24 rounded bg-neutral-100' />
      </div>

      <div className='grid gap-5 lg:grid-cols-2'>
        <div className='h-64 animate-pulse rounded-2xl border border-neutral-200 bg-neutral-100' />

        <div className='h-64 animate-pulse rounded-2xl border border-neutral-200 bg-neutral-100' />
      </div>
    </div>
  );
}

/* =========================================================
   MAIN TRACK ORDER PAGE
========================================================= */

export default function TrackOrder() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  /* =======================================================
     TRACK ORDER
  ======================================================= */

  const handleTrackOrder = (event) => {
    event.preventDefault();

    const value = normalizeTrackingNumber(trackingNumber);

    setHasSearched(true);
    setError('');
    setOrder(null);

    if (!value) {
      setError('Please enter your order or tracking number.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const foundOrder = mockOrders[value];

      if (foundOrder) {
        setOrder(foundOrder);
        setError('');
      } else {
        setOrder(null);
        setError('not-found');
      }

      setLoading(false);
    }, 900);
  };

  /* =======================================================
     RETRY
  ======================================================= */

  const handleRetry = () => {
    setError('');
    setHasSearched(false);
    setOrder(null);
    setTrackingNumber('');
  };

  return (
    <main className='min-h-screen bg-white text-black'>
      {/* =================================================
          HERO
      ================================================= */}

      <section className='px-4 pt-8 sm:px-6 lg:px-8'>
        <div
          className='relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <div className='absolute inset-0 bg-black/55' />

          <div className='relative flex min-h-[300px] items-center justify-center px-5 py-16 text-center sm:min-h-[360px] sm:px-8 sm:py-20'>
            <div className='max-w-2xl text-white'>
              <p className='text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60 sm:text-xs'>
                NBLX ORDER SERVICES
              </p>

              <h1 className='mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl'>
                Track Your Order
              </h1>

              <p className='mx-auto mt-4 max-w-xl text-sm leading-6 text-white/75 sm:text-base'>
                Follow your order every step of the way, from confirmation to
                delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          TRACKING SEARCH
      ================================================= */}

      <section className='relative z-10 mx-auto -mt-8 max-w-4xl px-4 sm:px-6 lg:px-8'>
        <form
          onSubmit={handleTrackOrder}
          className='rounded-2xl border border-neutral-200 bg-white p-5 shadow-xl shadow-black/5 sm:p-7'
        >
          <div className='text-center'>
            <p className='mt-1 text-xs leading-5 text-neutral-500 sm:text-sm'>
              Enter your NBLX Order ID below to see the latest status of your
              order.
            </p>
          </div>

          <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
            <div className='relative flex-1'>
              <FaMagnifyingGlass className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-neutral-400' />

              <input
                id='tracking-number'
                type='text'
                value={trackingNumber}
                onChange={(event) => {
                  setTrackingNumber(event.target.value.toUpperCase());

                  if (error) {
                    setError('');
                  }
                }}
                placeholder='Enter your order number'
                autoComplete='off'
                spellCheck='false'
                className='h-12 w-full rounded-full border border-neutral-200 bg-neutral-50 pl-11 pr-4 text-sm uppercase outline-none transition placeholder:normal-case placeholder:text-neutral-400 focus:border-black focus:bg-white'
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-black px-8 text-xs font-semibold tracking-wide text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60'
            >
              {loading ? (
                <>
                  <span className='h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white' />
                  TRACKING...
                </>
              ) : (
                <>
                  TRACK ORDER
                  <FaChevronRight className='text-[10px]' />
                </>
              )}
            </button>
          </div>

          {error && error !== 'not-found' && (
            <p className='mt-3 flex items-center gap-2 px-2 text-xs text-red-600'>
              <FaCircleExclamation />
              {error}
            </p>
          )}

          <p className='mt-3 text-center text-[11px] leading-5 text-neutral-400'>
            Your order number can usually be found in your order confirmation
            email.
          </p>
        </form>
      </section>

      {/* =================================================
          INITIAL STATE
      ================================================= */}

      {!hasSearched && !loading && (
        <section className='mx-auto max-w-2xl px-4 pb-20 pt-12 sm:px-6 sm:pt-14 lg:px-8'>
          <div className='rounded-2xl border border-dashed border-neutral-200 px-6 py-12 text-center sm:px-10'>
            <div className='mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-700'>
              <FaBoxOpen className='text-xl' />
            </div>

            <h2 className='mt-5 text-lg font-semibold'>
              Track your NBLX order
            </h2>

            <p className='mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500'>
              Enter your order number above to view your delivery status,
              estimated arrival, shipping progress, and order details.
            </p>
          </div>
        </section>
      )}

      {/* =================================================
          HOW IT WORKS
          
          IMPORTANT:
          This section ONLY appears before a successful
          tracking result.
      ================================================= */}

      {!order && !loading && error !== 'not-found' && (
        <section className='mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-6 sm:pt-8 lg:px-8'>
          <div className='mb-8 text-center'>
            <p className='text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400 sm:text-xs'>
              SIMPLE &amp; TRANSPARENT
            </p>

            <h2 className='mt-2 text-2xl font-semibold tracking-tight text-black sm:text-3xl'>
              How It Works
            </h2>

            <p className='mx-auto mt-3 max-w-xl text-sm leading-6 text-neutral-500'>
              Stay updated on your NBLX order from the moment it is confirmed
              until it arrives at your doorstep.
            </p>
          </div>

          <div className='grid gap-5 md:grid-cols-3'>
            {/* STEP 01 */}
            <div
              className='group relative min-h-[320px] overflow-hidden rounded-2xl bg-cover bg-center'
              style={{
                backgroundImage: `url(${howTrack1})`,
              }}
            >
              <div className='absolute inset-0 bg-black/50 transition duration-300 group-hover:bg-black/60' />

              <div className='relative flex h-full min-h-[320px] flex-col justify-end p-6 text-white sm:p-7'>
                <span className='mb-auto flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-bold text-black'>
                  01
                </span>

                <div>
                  <p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60'>
                    STEP ONE
                  </p>

                  <h3 className='mt-2 text-xl font-semibold'>
                    Place Your Order
                  </h3>

                  <p className='mt-2 text-sm leading-6 text-white/75'>
                    Complete your purchase through NBLX and receive your unique
                    order number in your confirmation details.
                  </p>
                </div>
              </div>
            </div>

            {/* STEP 02 */}
            <div
              className='group relative min-h-[320px] overflow-hidden rounded-2xl bg-cover bg-center'
              style={{
                backgroundImage: `url(${howTrack2})`,
              }}
            >
              <div className='absolute inset-0 bg-black/50 transition duration-300 group-hover:bg-black/60' />

              <div className='relative flex h-full min-h-[320px] flex-col justify-end p-6 text-white sm:p-7'>
                <span className='mb-auto flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-bold text-black'>
                  02
                </span>

                <div>
                  <p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60'>
                    STEP TWO
                  </p>

                  <h3 className='mt-2 text-xl font-semibold'>
                    Track Your Order
                  </h3>

                  <p className='mt-2 text-sm leading-6 text-white/75'>
                    Enter your NBLX order number above to view your latest
                    shipping status and delivery updates.
                  </p>
                </div>
              </div>
            </div>

            {/* STEP 03 */}
            <div
              className='group relative min-h-[320px] overflow-hidden rounded-2xl bg-cover bg-center'
              style={{
                backgroundImage: `url(${howTrack3})`,
              }}
            >
              <div className='absolute inset-0 bg-black/50 transition duration-300 group-hover:bg-black/60' />

              <div className='relative flex h-full min-h-[320px] flex-col justify-end p-6 text-white sm:p-7'>
                <span className='mb-auto flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-bold text-black'>
                  03
                </span>

                <div>
                  <p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60'>
                    STEP THREE
                  </p>

                  <h3 className='mt-2 text-xl font-semibold'>
                    Receive Your Order
                  </h3>

                  <p className='mt-2 text-sm leading-6 text-white/75'>
                    Follow the delivery progress and get notified as your order
                    moves closer to its final destination.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =================================================
          LOADING
      ================================================= */}

      {loading && <LoadingState />}

      {/* =================================================
          ERROR
      ================================================= */}

      {!loading && error === 'not-found' && (
        <section className='px-4 pb-20 sm:px-6 lg:px-8'>
          <TrackingError onRetry={handleRetry} />

          <div className='mx-auto mt-6 max-w-2xl rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-center'>
            <h3 className='text-sm font-semibold text-black'>
              Need help finding your order?
            </h3>

            <p className='mt-2 text-xs leading-5 text-neutral-500'>
              If you believe your tracking number is correct, contact NBLX
              support and we'll help you locate your order.
            </p>

            <a
              href='mailto:NBLX06@gmail.com'
              className='mt-4 inline-flex items-center gap-2 text-xs font-semibold text-black underline underline-offset-4'
            >
              <FaPhone className='text-[10px]' />
              CONTACT NBLX SUPPORT
            </a>
          </div>
        </section>
      )}

      {/* =================================================
          ORDER RESULT
      ================================================= */}

      {!loading && order && (
        <section className='mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pt-10 lg:px-8'>
          {/* ORDER STATUS */}
          <div className='overflow-hidden rounded-2xl border border-neutral-200 bg-white'>
            <div className='border-b border-neutral-100 p-5 sm:p-7'>
              <div className='flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between'>
                <div>
                  <p className='text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400'>
                    Order Number
                  </p>

                  <h2 className='mt-1 break-all text-xl font-semibold tracking-tight sm:text-2xl'>
                    #{order.id}
                  </h2>

                  <p className='mt-2 text-xs text-neutral-500'>
                    Placed {order.date}
                  </p>
                </div>

                <div className='sm:text-right'>
                  <span className='inline-flex items-center gap-2 rounded-full bg-black px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white'>
                    <span className='h-1.5 w-1.5 rounded-full bg-white' />
                    {order.status}
                  </span>
                </div>
              </div>

              {/* ESTIMATED DELIVERY */}
              <div className='mt-7 rounded-xl bg-neutral-50 p-4 sm:p-5'>
                <div className='flex items-start gap-3'>
                  <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-neutral-700 shadow-sm'>
                    <FaClock className='text-sm' />
                  </div>

                  <div>
                    <p className='text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400'>
                      Estimated Delivery
                    </p>

                    <p className='mt-1 text-sm font-semibold text-black'>
                      {order.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </div>

              <StatusTimeline order={order} />
            </div>

            {/* LATEST UPDATE */}
            <div className='border-b border-neutral-100 bg-neutral-50 p-5 sm:p-7'>
              <div className='flex gap-4'>
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white'>
                  <FaTruck className='text-sm' />
                </div>

                <div>
                  <p className='text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400'>
                    Latest Update
                  </p>

                  <h3 className='mt-1 text-sm font-semibold text-black'>
                    {order.updates[0]?.title}
                  </h3>

                  <p className='mt-1 max-w-2xl text-sm leading-6 text-neutral-500'>
                    {order.updates[0]?.description}
                  </p>

                  <p className='mt-2 text-[11px] text-neutral-400'>
                    Updated {order.updates[0]?.date} ·{' '}
                    {order.updates[0]?.time}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ORDER DETAILS */}
          <div className='mt-5 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]'>
            <div className='rounded-2xl border border-neutral-200 bg-white p-5 sm:p-7'>
              <OrderItems items={order.items} />

              <div className='mt-7'>
                <OrderTotals order={order} />
              </div>
            </div>

            <div className='rounded-2xl border border-neutral-200 bg-white p-5 sm:p-7'>
              <ShippingInformation customer={order.customer} />
            </div>
          </div>

          {/* DELIVERY HISTORY */}
          <div className='mt-5 rounded-2xl border border-neutral-200 bg-white p-5 sm:p-7'>
            <DeliveryHistory updates={order.updates} />
          </div>

          {/* SUPPORT */}
          <div className='mt-5 rounded-2xl bg-neutral-950 p-6 text-white sm:p-8'>
            <div className='flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between'>
              <div>
                <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500'>
                  Need Assistance?
                </p>

                <h3 className='mt-2 text-lg font-semibold'>
                  Need help with your order?
                </h3>

                <p className='mt-1 max-w-lg text-sm leading-6 text-neutral-400'>
                  If your tracking information hasn't updated or you have
                  questions about your delivery, our support team can help.
                </p>
              </div>

              <a
                href='mailto:NBLX06@gmail.com'
                className='inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-xs font-semibold tracking-wide text-black transition hover:bg-neutral-200'
              >
                CONTACT SUPPORT
                <FaChevronRight className='text-[9px]' />
              </a>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}