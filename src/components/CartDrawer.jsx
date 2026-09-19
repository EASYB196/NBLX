// // import React, { useEffect, useRef } from 'react';

// // import { useCart } from '../Context/cartContext';
// // import { Link } from 'react-router-dom';
// // import { FaTrashAlt } from 'react-icons/fa';

// // const CartDrawer = () => {
// //   const {
// //     cartItems,
// //     showCart,
// //     setShowCart,
// //     removeFromCart,
// //     updateQuantity,
// //   } = useCart();

// //   const cartRef = useRef(null);

// //   // CREATE PRODUCT SLUG
// //   const createSlug = (name) => {
// //     return name
// //       ?.toString()
// //       .toLowerCase()
// //       .trim()
// //       .replace(/[^a-z0-9\s-]/g, '')
// //       .replace(/\s+/g, '-')
// //       .replace(/-+/g, '-');
// //   };

// //   // SUBTOTAL
// //   const subtotal = cartItems.reduce(
// //     (total, item) =>
// //       total +
// //       Number(item.price || 0) *
// //         Number(item.quantity || 0),
// //     0
// //   );

// //   // CLOSE ON OUTSIDE CLICK
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (
// //         cartRef.current &&
// //         !cartRef.current.contains(event.target)
// //       ) {
// //         setShowCart(false);
// //       }
// //     };

// //     document.addEventListener(
// //       'mousedown',
// //       handleClickOutside
// //     );

// //     return () => {
// //       document.removeEventListener(
// //         'mousedown',
// //         handleClickOutside
// //       );
// //     };
// //   }, [setShowCart]);

// //   // REMOVE PRODUCT
// //   const handleRemove = (event, index) => {
// //     event.preventDefault();
// //     event.stopPropagation();

// //     removeFromCart(index);
// //   };

// //   // DECREASE QUANTITY
// //   const handleDecrease = (
// //     event,
// //     index,
// //     quantity
// //   ) => {
// //     event.preventDefault();
// //     event.stopPropagation();

// //     if (quantity <= 1) return;

// //     updateQuantity(index, quantity - 1);
// //   };

// //   // INCREASE QUANTITY
// //   const handleIncrease = (
// //     event,
// //     index,
// //     quantity
// //   ) => {
// //     event.preventDefault();
// //     event.stopPropagation();

// //     updateQuantity(index, quantity + 1);
// //   };

// //   return (
// //     <>
// //       {/* BACKDROP */}

// //       <div
// //         className={`
// //           fixed inset-0
// //           bg-black/40
// //           backdrop-blur-sm
// //           z-[100]
// //           transition-opacity
// //           duration-300
// //           ${
// //             showCart
// //               ? 'opacity-100 visible'
// //               : 'opacity-0 invisible'
// //           }
// //         `}
// //         onClick={() => setShowCart(false)}
// //       />

// //       {/* CART DRAWER */}

// //       <div
// //         ref={cartRef}
// //         className={`
// //           fixed
// //           top-0
// //           right-0
// //           h-full
// //           w-[320px]
// //           md:w-[380px]
// //           bg-white
// //           text-black
// //           shadow-2xl
// //           z-[110]
// //           transform
// //           transition-transform
// //           duration-500
// //           ${
// //             showCart
// //               ? 'translate-x-0'
// //               : 'translate-x-full'
// //           }
// //         `}
// //       >
// //         <div className="p-5 h-full flex flex-col">

// //           {/* HEADER */}

// //           <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">

// //             <h2 className="text-xl font-bold">
// //               Shopping Cart
// //             </h2>

// //             <button
// //               type="button"
// //               onClick={() => setShowCart(false)}
// //               className="text-xl hover:text-red-500 transition"
// //               aria-label="Close cart"
// //             >
// //               ✕
// //             </button>

// //           </div>

// //           {/* CART COUNT */}

// //           <h4 className="text-[15px] text-gray-500 mb-4">
// //             {cartItems.length === 0
// //               ? 'Your cart is empty.'
// //               : `${cartItems.length} item${
// //                   cartItems.length > 1
// //                     ? 's'
// //                     : ''
// //                 } in cart`}
// //           </h4>

// //           {/* CART ITEMS */}

// //           <div className="flex-1 overflow-y-auto pr-1">

// //             {cartItems.length === 0 ? (

// //               <div className="py-10 text-center text-gray-400">
// //                 No items yet
// //               </div>

// //             ) : (

// //               cartItems.map((item, index) => {

// //                 const quantity =
// //                   Number(item.quantity) || 1;

// //                 const productSlug =
// //                   createSlug(item.name);

// //                 const itemTotal =
// //                   Number(item.price || 0) *
// //                   quantity;

// //                 return (
// //                   <div
// //                     key={`${item.id}-${item.selectedSize}-${index}`}
// //                     className="mb-4 pb-4 border-b border-gray-100"
// //                   >

// //                     {/* PRODUCT ROW */}

// //                     <div className="flex items-start gap-3">

// //                       {/* PRODUCT LINK */}

// //                       <Link
// //                         to={`/bestseller/products/${productSlug}`}
// //                         onClick={() =>
// //                           setShowCart(false)
// //                         }
// //                         className="flex items-center gap-3 flex-1 min-w-0"
// //                       >

// //                         <img
// //                           src={item.image}
// //                           alt={item.name}
// //                           className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
// //                         />

// //                         <div className="flex-1 min-w-0">

// //                           <p className="font-semibold text-sm truncate">
// //                             {item.name}
// //                           </p>

// //                           {item.selectedSize && (
// //                             <p className="text-xs text-gray-500 mt-1">
// //                               Size: {item.selectedSize}
// //                             </p>
// //                           )}

// //                           <p className="font-semibold text-sm mt-1">
// //                             ₦
// //                             {itemTotal.toLocaleString(
// //                               'en-NG'
// //                             )}
// //                           </p>

// //                         </div>

// //                       </Link>

// //                       {/* DELETE */}

// //                       <button
// //                         type="button"
// //                         onClick={(event) =>
// //                           handleRemove(
// //                             event,
// //                             index
// //                           )
// //                         }
// //                         className="text-red-500 hover:text-red-700 transition p-1 flex-shrink-0"
// //                         aria-label={`Remove ${item.name} from cart`}
// //                       >
// //                         <FaTrashAlt className="text-sm" />
// //                       </button>

// //                     </div>

// //                     {/* QUANTITY */}

// //                     <div className="flex items-center justify-between mt-3 pl-[76px]">

// //                       <p className="text-sm font-semibold">
// //                         Quantity:
// //                       </p>

// //                       <div className="flex items-center gap-2">

// //                         {/* MINUS */}

// //                         <button
// //                           type="button"
// //                           onClick={(event) =>
// //                             handleDecrease(
// //                               event,
// //                               index,
// //                               quantity
// //                             )
// //                           }
// //                           disabled={quantity <= 1}
// //                           className={`
// //                             w-8 h-8
// //                             flex items-center justify-center
// //                             rounded
// //                             border
// //                             transition
// //                             ${
// //                               quantity <= 1
// //                                 ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
// //                                 : 'bg-gray-100 hover:bg-gray-200 text-black border-gray-200'
// //                             }
// //                           `}
// //                           aria-label="Decrease quantity"
// //                         >
// //                           −
// //                         </button>

// //                         {/* QUANTITY NUMBER */}

// //                         <span className="text-sm font-semibold w-5 text-center">
// //                           {quantity}
// //                         </span>

// //                         {/* PLUS */}

// //                         <button
// //                           type="button"
// //                           onClick={(event) =>
// //                             handleIncrease(
// //                               event,
// //                               index,
// //                               quantity
// //                             )
// //                           }
// //                           className="
// //                             w-8 h-8
// //                             flex items-center justify-center
// //                             rounded
// //                             border
// //                             border-gray-200
// //                             bg-gray-100
// //                             hover:bg-gray-200
// //                             text-black
// //                             transition
// //                           "
// //                           aria-label="Increase quantity"
// //                         >
// //                           +
// //                         </button>

// //                       </div>

// //                     </div>

// //                   </div>
// //                 );
// //               })
// //             )}

// //           </div>

// //           {/* FOOTER */}

// //           <div className="border-t pt-4 bg-white">

// //             <div className="flex justify-between items-center">

// //               <p className="text-lg font-semibold">
// //                 Subtotal
// //               </p>

// //               <p className="text-lg font-bold">
// //                 ₦
// //                 {subtotal.toLocaleString(
// //                   'en-NG'
// //                 )}
// //               </p>

// //             </div>

// //             <button
// //               type="button"
// //               className="w-full bg-black text-white py-3 mt-3 font-bold rounded-lg hover:opacity-90 transition"
// //             >
// //               Checkout
// //             </button>

// //           </div>

// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default CartDrawer;

// import React, { useEffect, useRef } from 'react';
// import { useCart } from '../Context/cartContext';
// import { Link } from 'react-router-dom';
// import { FaTrashAlt } from 'react-icons/fa';

// const CartDrawer = () => {
//   const {
//     cartItems,
//     showCart,
//     setShowCart,
//     removeFromCart,
//     updateQuantity,
//   } = useCart();

//   const cartRef = useRef(null);

//   // SUBTOTAL
//   const subtotal = cartItems.reduce(
//     (total, item) =>
//       total +
//       Number(item.price || 0) *
//         Number(item.quantity || 0),
//     0
//   );

//   // CLOSE ON OUTSIDE CLICK
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         cartRef.current &&
//         !cartRef.current.contains(event.target)
//       ) {
//         setShowCart(false);
//       }
//     };

//     document.addEventListener(
//       'mousedown',
//       handleClickOutside
//     );

//     return () => {
//       document.removeEventListener(
//         'mousedown',
//         handleClickOutside
//       );
//     };
//   }, [setShowCart]);

//   // REMOVE PRODUCT
//   const handleRemove = (event, index) => {
//     event.preventDefault();
//     event.stopPropagation();

//     removeFromCart(index);
//   };

//   // DECREASE QUANTITY
//   const handleDecrease = (
//     event,
//     index,
//     quantity
//   ) => {
//     event.preventDefault();
//     event.stopPropagation();

//     if (quantity <= 1) return;

//     updateQuantity(index, quantity - 1);
//   };

//   // INCREASE QUANTITY
//   const handleIncrease = (
//     event,
//     index,
//     quantity
//   ) => {
//     event.preventDefault();
//     event.stopPropagation();

//     updateQuantity(index, quantity + 1);
//   };

//   return (
//     <>
//       {/* BACKDROP */}

//       <div
//         className={`
//           fixed inset-0
//           bg-black/40
//           backdrop-blur-sm
//           z-[100]
//           transition-opacity
//           duration-300
//           ${
//             showCart
//               ? 'opacity-100 visible'
//               : 'opacity-0 invisible'
//           }
//         `}
//         onClick={() => setShowCart(false)}
//       />

//       {/* CART DRAWER */}

//       <div
//         ref={cartRef}
//         className={`
//           fixed
//           top-0
//           right-0
//           h-full
//           w-[320px]
//           md:w-[380px]
//           bg-white
//           text-black
//           shadow-2xl
//           z-[110]
//           transform
//           transition-transform
//           duration-500
//           ${
//             showCart
//               ? 'translate-x-0'
//               : 'translate-x-full'
//           }
//         `}
//       >
//         <div className="p-5 h-full flex flex-col">

//           {/* HEADER */}

//           <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">

//             <h2 className="text-xl font-bold">
//               Shopping Cart
//             </h2>

//             <button
//               type="button"
//               onClick={() => setShowCart(false)}
//               className="text-xl hover:text-red-500 transition"
//               aria-label="Close cart"
//             >
//               ✕
//             </button>

//           </div>

//           {/* CART COUNT */}

//           <h4 className="text-[15px] text-gray-500 mb-4">
//             {cartItems.length === 0
//               ? 'Your cart is empty.'
//               : `${cartItems.length} item${
//                   cartItems.length > 1
//                     ? 's'
//                     : ''
//                 } in cart`}
//           </h4>

//           {/* CART ITEMS */}

//           <div className="flex-1 overflow-y-auto pr-1">

//             {cartItems.length === 0 ? (

//               <div className="py-10 text-center text-gray-400">
//                 No items yet
//               </div>

//             ) : (

//               cartItems.map((item, index) => {

//                 const quantity =
//                   Number(item.quantity) || 1;

//                 const itemTotal =
//                   Number(item.price || 0) *
//                   quantity;

//                 /*
//                  * IMPORTANT:
//                  * The route is saved when the product
//                  * is added to the cart.
//                  *
//                  * This prevents every product from
//                  * being routed to Best Sellers.
//                  */
//                 const productRoute =
//                   item.route ||
//                   `/products/${item.id}`;

//                 return (
//                   <div
//                     key={`${item.id}-${item.selectedSize}-${index}`}
//                     className="mb-4 pb-4 border-b border-gray-100"
//                   >

//                     {/* PRODUCT ROW */}

//                     <div className="flex items-start gap-3">

//                       {/* PRODUCT LINK */}

//                       <Link
//                         to={productRoute}
//                         onClick={() =>
//                           setShowCart(false)
//                         }
//                         className="flex items-center gap-3 flex-1 min-w-0"
//                       >

//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
//                         />

//                         <div className="flex-1 min-w-0">

//                           <p className="font-semibold text-sm truncate">
//                             {item.name}
//                           </p>

//                           {item.selectedSize && (
//                             <p className="text-xs text-gray-500 mt-1">
//                               Size: {item.selectedSize}
//                             </p>
//                           )}

//                           <p className="font-semibold text-sm mt-1">
//                             ₦
//                             {itemTotal.toLocaleString(
//                               'en-NG'
//                             )}
//                           </p>

//                         </div>

//                       </Link>

//                       {/* DELETE */}

//                       <button
//                         type="button"
//                         onClick={(event) =>
//                           handleRemove(
//                             event,
//                             index
//                           )
//                         }
//                         className="text-red-500 hover:text-red-700 transition p-1 flex-shrink-0"
//                         aria-label={`Remove ${item.name} from cart`}
//                       >
//                         <FaTrashAlt className="text-sm" />
//                       </button>

//                     </div>

//                     {/* QUANTITY */}

//                     <div className="flex items-center justify-between mt-3 pl-[76px]">

//                       <p className="text-sm font-semibold">
//                         Quantity:
//                       </p>

//                       <div className="flex items-center gap-2">

//                         {/* MINUS */}

//                         <button
//                           type="button"
//                           onClick={(event) =>
//                             handleDecrease(
//                               event,
//                               index,
//                               quantity
//                             )
//                           }
//                           disabled={quantity <= 1}
//                           className={`
//                             w-8 h-8
//                             flex items-center justify-center
//                             rounded
//                             border
//                             transition
//                             ${
//                               quantity <= 1
//                                 ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
//                                 : 'bg-gray-100 hover:bg-gray-200 text-black border-gray-200'
//                             }
//                           `}
//                           aria-label="Decrease quantity"
//                         >
//                           −
//                         </button>

//                         {/* QUANTITY NUMBER */}

//                         <span className="text-sm font-semibold w-5 text-center">
//                           {quantity}
//                         </span>

//                         {/* PLUS */}

//                         <button
//                           type="button"
//                           onClick={(event) =>
//                             handleIncrease(
//                               event,
//                               index,
//                               quantity
//                             )
//                           }
//                           className="
//                             w-8 h-8
//                             flex items-center justify-center
//                             rounded
//                             border
//                             border-gray-200
//                             bg-gray-100
//                             hover:bg-gray-200
//                             text-black
//                             transition
//                           "
//                           aria-label="Increase quantity"
//                         >
//                           +
//                         </button>

//                       </div>

//                     </div>

//                   </div>
//                 );
//               })
//             )}

//           </div>

//           {/* FOOTER */}

//           <div className="border-t pt-4 bg-white">

//             <div className="flex justify-between items-center">

//               <p className="text-lg font-semibold">
//                 Subtotal
//               </p>

//               <p className="text-lg font-bold">
//                 ₦
//                 {subtotal.toLocaleString(
//                   'en-NG'
//                 )}
//               </p>

//             </div>

//             <button
//               type="button"
//               className="w-full bg-black text-white py-3 mt-3 font-bold rounded-lg hover:opacity-90 transition"
//             >
//               Checkout
//             </button>

//           </div>

//         </div>
//       </div>
//     </>
//   );
// };

// export default CartDrawer;

import React, { useEffect, useRef } from 'react';
import { useCart } from '../Context/cartContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';

const CartDrawer = () => {
  const navigate = useNavigate();

  const { cartItems, showCart, setShowCart, removeFromCart, updateQuantity } = useCart();

  const cartRef = useRef(null);

  // SUBTOTAL
  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price || 0) * Number(item.quantity || 0),
    0,
  );

  // CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowCart]);

  // REMOVE PRODUCT
  const handleRemove = (event, index) => {
    event.preventDefault();
    event.stopPropagation();

    removeFromCart(index);
  };

  // DECREASE QUANTITY
  const handleDecrease = (event, index, quantity) => {
    event.preventDefault();
    event.stopPropagation();

    if (quantity <= 1) return;

    updateQuantity(index, quantity - 1);
  };

  // INCREASE QUANTITY
  const handleIncrease = (event, index, quantity) => {
    event.preventDefault();
    event.stopPropagation();

    updateQuantity(index, quantity + 1);
  };

  return (
    <>
      {/* BACKDROP */}

      <div
        className={`
          fixed inset-0
          bg-black/40
          backdrop-blur-sm
          z-[100]
          transition-opacity
          duration-300
          ${showCart ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        onClick={() => setShowCart(false)}
      />

      {/* CART DRAWER */}

      <div
        ref={cartRef}
        className={`
          fixed
          top-0
          right-0
          h-full
          w-[320px]
          md:w-[380px]
          bg-white
          text-black
          shadow-2xl
          z-[110]
          transform
          transition-transform
          duration-500
          ${showCart ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className='p-5 h-full flex flex-col'>
          {/* HEADER */}

          <div className='flex justify-between items-center mb-4 border-b border-gray-200 pb-3'>
            <h2 className='text-xl font-bold'>Shopping Cart</h2>

            <button
              type='button'
              onClick={() => setShowCart(false)}
              className='text-xl hover:text-red-500 transition'
              aria-label='Close cart'
            >
              ✕
            </button>
          </div>

          {/* CART COUNT */}

          <h4 className='text-[15px] text-gray-500 mb-4'>
            {cartItems.length === 0
              ? 'Your cart is empty.'
              : `${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in cart`}
          </h4>

          {/* CART ITEMS */}

          <div className='flex-1 overflow-y-auto pr-1'>
            {cartItems.length === 0 ? (
              <div className='py-10 text-center text-gray-400'>No items yet</div>
            ) : (
              cartItems.map((item, index) => {
                const quantity = Number(item.quantity) || 1;

                const itemTotal = Number(item.price || 0) * quantity;

                /*
                 * IMPORTANT:
                 *
                 * Every detail page supplies its own
                 * canonical route when adding the product
                 * to the cart.
                 *
                 * Example:
                 *
                 * Best Seller:
                 * /bestseller/products/123
                 *
                 * Pants:
                 * /pants/123
                 *
                 * T-Shirt:
                 * /t-shirt/123
                 *
                 * If an older cart item does not have a
                 * saved route, fall back to the generic
                 * product route.
                 */
                const productRoute = item.route || `/products/${item.id}`;

                return (
                  <div
                    key={`${item.id}-${item.selectedSize}-${index}`}
                    className='mb-4 pb-4 border-b border-gray-100'
                  >
                    {/* PRODUCT ROW */}

                    <div className='flex items-start gap-3'>
                      {/* PRODUCT LINK */}

                      <Link
                        to={productRoute}
                        onClick={() => setShowCart(false)}
                        className='flex items-center gap-3 flex-1 min-w-0'
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className='w-16 h-16 object-cover rounded-lg flex-shrink-0'
                        />

                        <div className='flex-1 min-w-0'>
                          <p className='font-semibold text-sm truncate'>{item.name}</p>

                          {item.selectedSize && (
                            <p className='text-xs text-gray-500 mt-1'>
                              Size: {item.selectedSize}
                            </p>
                          )}

                          <p className='font-semibold text-sm mt-1'>
                            ₦{itemTotal.toLocaleString('en-NG')}
                          </p>
                        </div>
                      </Link>

                      {/* DELETE */}

                      <button
                        type='button'
                        onClick={(event) => handleRemove(event, index)}
                        className='text-red-500 hover:text-red-700 transition p-1 flex-shrink-0'
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <FaTrashAlt className='text-sm' />
                      </button>
                    </div>

                    {/* QUANTITY */}

                    <div className='flex items-center justify-between mt-3 pl-[76px]'>
                      <p className='text-sm font-semibold'>Quantity:</p>

                      <div className='flex items-center gap-2'>
                        {/* MINUS */}

                        <button
                          type='button'
                          onClick={(event) => handleDecrease(event, index, quantity)}
                          disabled={quantity <= 1}
                          className={`
                            w-8 h-8
                            flex items-center justify-center
                            rounded
                            border
                            transition
                            ${
                              quantity <= 1
                                ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
                                : 'bg-gray-100 hover:bg-gray-200 text-black border-gray-200'
                            }
                          `}
                          aria-label='Decrease quantity'
                        >
                          −
                        </button>

                        {/* QUANTITY NUMBER */}

                        <span className='text-sm font-semibold w-5 text-center'>
                          {quantity}
                        </span>

                        {/* PLUS */}

                        <button
                          type='button'
                          onClick={(event) => handleIncrease(event, index, quantity)}
                          className='
                            w-8 h-8
                            flex items-center justify-center
                            rounded
                            border
                            border-gray-200
                            bg-gray-100
                            hover:bg-gray-200
                            text-black
                            transition
                          '
                          aria-label='Increase quantity'
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* FOOTER */}

          <div className='border-t pt-4 bg-white'>
            <div className='flex justify-between items-center'>
              <p className='text-lg font-semibold'>Subtotal</p>

              <p className='text-lg font-bold'>₦{subtotal.toLocaleString('en-NG')}</p>
            </div>

            <button
              type='button'
              onClick={() => {
                setShowCart(false);
                navigate('/checkout');
              }}
              className='w-full bg-black text-white py-3 mt-3 font-bold rounded-lg hover:opacity-90 transition'
            >
              {' '}
              Checkout{' '}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
  