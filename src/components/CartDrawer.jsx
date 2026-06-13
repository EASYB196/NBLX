import React, { useEffect, useRef } from 'react';
import { useCart } from '../Context/cartContext';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';

const CartDrawer = () => {
  const { cartItems, showCart, setShowCart, removeFromCart } = useCart();
  const cartRef = useRef(null);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowCart]);

  return (
    <>
      {/* BACKDROP OVERLAY (BELOW DRAWER, ABOVE NAVBAR) */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-100 transition-opacity duration-300 ${
          showCart ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setShowCart(false)}
      />

      {/* CART DRAWER (TOP LAYER) */}
      <div
        ref={cartRef}
        className={`fixed top-0 right-0 h-full w-[320px] md:w-95 bg-white text-black shadow-2xl z-110 transform transition-transform duration-500 ${
          showCart ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-5 h-full flex flex-col justify-between">

          {/* HEADER */}
          <div>
            <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
              <h2 className="text-xl font-bold">Shopping Cart</h2>

              <button
                onClick={() => setShowCart(false)}
                className="text-xl hover:text-red-500 transition"
              >
                ✕
              </button>
            </div>

            <h4 className="text-[15px] text-gray-500 mb-4">
              {cartItems.length === 0
                ? 'Your cart is empty.'
                : `${cartItems.length} item(s) in cart`}
            </h4>

            {/* ITEMS */}
            {cartItems.length === 0 ? (
              <div className="py-10 text-center text-gray-400">
                No items yet
              </div>
            ) : (
              cartItems.map((item, index) => (
                <Link
                  to={`/bestseller/products/${item.id}`}
                  key={index}
                  onClick={() => setShowCart(false)}
                  className="flex items-center gap-3 mb-4 hover:bg-gray-100 p-2 rounded-lg transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />

                  <div className="flex-1">
                    <p className="font-semibold text-sm">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Size: {item.selectedSize}
                    </p>
                    <p className="text-xs">Qty: {item.quantity}</p>
                    <p className="font-medium text-sm">
                      ₦{(item.price * item.quantity).toLocaleString('en-NG')}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromCart(index);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                </Link>
              ))
            )}
          </div>

          {/* FOOTER */}
          <div className="border-t pt-4">
            <p className="text-lg font-semibold">
              Subtotal: ₦{subtotal.toLocaleString('en-NG')}
            </p>

            <button className="w-full bg-black text-white py-3 mt-3 font-bold rounded-lg hover:opacity-90 transition">
              Checkout
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default CartDrawer;

// import React, { useEffect, useRef } from 'react';
// import { useCart } from '../Context/cartContext';
// import { Link } from 'react-router-dom';
// import { FaTrashAlt } from 'react-icons/fa';

// const CartDrawer = () => {
//   const { cartItems, showCart, setShowCart, removeFromCart } = useCart();
//   const cartRef = useRef(null);

//   const subtotal = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   // Close when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (cartRef.current && !cartRef.current.contains(event.target)) {
//         setShowCart(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [setShowCart]);

//   return (
//     <>
//       {/* BACKDROP OVERLAY */}
//       <div
//         className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
//           showCart ? 'opacity-100 visible' : 'opacity-0 invisible'
//         }`}
//         onClick={() => setShowCart(false)}
//       />

//       {/* CART DRAWER */}
//       <div
//         ref={cartRef}
//         className={`fixed top-0 right-0 h-full w-[320px] md:w-95 bg-white text-black shadow-2xl z-50 transform transition-transform duration-500 ${
//           showCart ? 'translate-x-0' : 'translate-x-full'
//         }`}
//       >
//         <div className="p-5 h-full flex flex-col justify-between">
          
//           {/* HEADER */}
//           <div>
//             <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
//               <h2 className="text-xl font-bold">Shopping Cart</h2>

//               <button
//                 onClick={() => setShowCart(false)}
//                 className="text-xl hover:text-red-500 transition"
//               >
//                 ✕
//               </button>
//             </div>

//             <h4 className="text-[15px] text-gray-500 mb-4">
//               {cartItems.length === 0
//                 ? 'Your cart is empty.'
//                 : `${cartItems.length} item(s) in cart`}
//             </h4>

//             {/* ITEMS */}
//             {cartItems.length === 0 ? (
//               <div className="py-10 text-center text-gray-400">
//                 No items yet
//               </div>
//             ) : (
//               cartItems.map((item, index) => (
//                 <Link
//                   to={`/products/${item.id}`}
//                   key={index}
//                   onClick={() => setShowCart(false)}
//                   className="flex items-center gap-3 mb-4 hover:bg-gray-100 p-2 rounded-lg transition"
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded"
//                   />

//                   <div className="flex-1">
//                     <p className="font-semibold text-sm">{item.name}</p>
//                     <p className="text-xs text-gray-500">
//                       Size: {item.selectedSize}
//                     </p>
//                     <p className="text-xs">Qty: {item.quantity}</p>
//                     <p className="font-medium text-sm">
//                       ₦{(item.price * item.quantity).toLocaleString('en-NG')}
//                     </p>
//                   </div>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       removeFromCart(index);
//                     }}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     <FaTrashAlt />
//                   </button>
//                 </Link>
//               ))
//             )}
//           </div>

//           {/* FOOTER */}
//           <div className="border-t pt-4">
//             <p className="text-lg font-semibold">
//               Subtotal: ₦{subtotal.toLocaleString('en-NG')}
//             </p>

//             <button className="w-full bg-black text-white py-3 mt-3 font-bold rounded-lg hover:opacity-90 transition">
//               Checkout
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CartDrawer;