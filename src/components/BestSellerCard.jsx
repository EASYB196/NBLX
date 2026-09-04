
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// // eslint-disable-next-line no-unused-vars
// import { motion } from 'framer-motion';

// import { FaHeart, FaRegHeart } from 'react-icons/fa';
// import { useWishlist } from '../Context/WishlistContext';

// const BestSellerCard = ({ product }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   const { toggleWishlist, isWishlisted } = useWishlist();

//   return (
//     <div className='shrink-0 w-40 sm:w-50 md:w-70 lg:w-[320px]'>
//       <div
//         className='relative overflow-hidden rounded-2xl bg-white'
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         {/* ❤️ WISHLIST HEART */}
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             toggleWishlist({
//               ...product,
//               route: `/bestseller/products/${product.id}`,
//             });
//           }}
//           className='absolute top-3 right-3 z-20 bg-white p-2 rounded-full shadow-md'
//         >
//           {isWishlisted(product.id) ? (
//             <FaHeart className='text-red-500 text-lg' />
//           ) : (
//             <FaRegHeart className='text-gray-500 text-lg hover:text-red-500' />
//           )}
//         </button>

//         <Link to={`/bestseller/products/${product.id}`}>
//           {/* MAIN IMAGE */}
//           <motion.img
//             src={product.image}
//             alt={product.name}
//             className='w-full object-center h-62.5 sm:h-80 md:h-105 lg:h-120 rounded-2xl'
//             animate={{ opacity: isHovered ? 0 : 1 }}
//             transition={{ duration: 0.4 }}
//           />

//           {/* HOVER IMAGE */}
//           <motion.img
//             src={product.hoverImage}
//             alt={product.name}
//             className='absolute inset-0 w-full object-center h-62.5 sm:h-80 md:h-105 lg:h-120 rounded-2xl'
//             animate={{ opacity: isHovered ? 1 : 0 }}
//             transition={{ duration: 0.4 }}
//           />

//           {/* OVERLAY */}
//           <div
//             className={`absolute inset-0 bg-black/10 flex items-center justify-center transition-all duration-300 ${
//               isHovered ? 'opacity-100' : 'opacity-0'
//             }`}
//           />
//         </Link>
//       </div>

//       {/* PRODUCT INFO */}
//       <div className='mt-4 flex flex-col gap-1 px-1'>
//         <h3 className='text-[13px] sm:text-sm md:text-lg font-semibold uppercase'>
//           {product.name}
//         </h3>

//         <p className='text-black font-bold text-sm sm:text-base md:text-lg'>
//           ₦{product.price.toLocaleString('en-NG')}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default BestSellerCard;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// // eslint-disable-next-line no-unused-vars
// import { motion } from 'framer-motion';

// import { FaHeart, FaRegHeart } from 'react-icons/fa';
// import { useWishlist } from '../Context/WishlistContext';

// const BestSellerCard = ({ product }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   const { toggleWishlist, isWishlisted } = useWishlist();

//   const handleWishlist = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     toggleWishlist({
//       ...product,
//       route: `/bestseller/products/${product.id}`,
//     });
//   };

//   return (
//     <div className="shrink-0 w-40 sm:w-50 md:w-70 lg:w-[320px]">
//       <div
//         className="relative overflow-hidden rounded-2xl bg-white"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         {/* PRODUCT LINK */}
//         <Link to={`/bestseller/products/${product.id}`}>
//           {/* MAIN IMAGE */}
//           <motion.img
//             src={product.image}
//             alt={product.id}
//             className="w-full object-center h-62.5 sm:h-80 md:h-105 lg:h-120 rounded-2xl"
//             animate={{
//               opacity: isHovered ? 0 : 1,
//             }}
//             transition={{
//               duration: 0.4,
//             }}
//           />

//           {/* HOVER IMAGE */}
//           <motion.img
//             src={product.hoverImage}
//             alt={`${product.id} alternate view`}
//             className="absolute inset-0 w-full object-center h-62.5 sm:h-80 md:h-105 lg:h-120 rounded-2xl"
//             animate={{
//               opacity: isHovered ? 1 : 0,
//             }}
//             transition={{
//               duration: 0.4,
//             }}
//           />

//           {/* OVERLAY */}
//           <div
//             className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${
//               isHovered ? 'opacity-100' : 'opacity-0'
//             }`}
//           />
//         </Link>

//         {/* ❤️ WISHLIST */}
//         <button
//           type="button"
//           onClick={handleWishlist}
//           aria-label={
//             isWishlisted(product.id)
//               ? 'Remove from wishlist'
//               : 'Add to wishlist'
//           }
//           className="absolute top-3 right-3 z-20 bg-white p-2 rounded-full shadow-md hover:scale-105 transition-transform duration-200"
//         >
//           {isWishlisted(product.id) ? (
//             <FaHeart className="text-red-500 text-lg" />
//           ) : (
//             <FaRegHeart className="text-gray-500 text-lg hover:text-red-500 transition-colors" />
//           )}
//         </button>
//       </div>

//       {/* PRODUCT INFO */}
//       <div className="mt-4 flex flex-col gap-1 px-1">
//         <h3 className="text-[13px] sm:text-sm md:text-lg font-semibold uppercase">
//           {product.id}
//         </h3>

//         <p className="text-black font-bold text-sm sm:text-base md:text-lg">
//           ₦{product.price.toLocaleString('en-NG')}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default BestSellerCard;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useWishlist } from '../Context/WishlistContext';

const BestSellerCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { toggleWishlist, isWishlisted } = useWishlist();

  const productRoute = `/bestseller/products/${product.id}`;

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist({
      ...product,
      route: productRoute,
    });
  };

  return (
    <div className="shrink-0 w-40 sm:w-50 md:w-70 lg:w-[320px]">
      <div
        className="relative overflow-hidden rounded-2xl bg-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* PRODUCT LINK */}
        <Link to={productRoute}>
          {/* MAIN IMAGE */}
          <motion.img
            src={product.image}
            alt={product.id}
            className="w-full object-center h-62.5 sm:h-80 md:h-105 lg:h-120 rounded-2xl"
            animate={{
              opacity: isHovered ? 0 : 1,
            }}
            transition={{
              duration: 0.4,
            }}
          />

          {/* HOVER IMAGE */}
          <motion.img
            src={product.hoverImage}
            alt={`${product.id} alternate view`}
            className="absolute inset-0 w-full object-center h-62.5 sm:h-80 md:h-105 lg:h-120 rounded-2xl"
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              duration: 0.4,
            }}
          />

          {/* OVERLAY */}
          <div
            className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </Link>

        {/* ❤️ WISHLIST */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            isWishlisted(product.id)
              ? 'Remove from wishlist'
              : 'Add to wishlist'
          }
          className="absolute top-3 right-3 z-20 bg-white p-2 rounded-full shadow-md hover:scale-105 transition-transform duration-200"
        >
          {isWishlisted(product.id) ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <FaRegHeart className="text-gray-500 text-lg hover:text-red-500 transition-colors" />
          )}
        </button>
      </div>

      {/* PRODUCT INFO */}
      <div className="mt-4 flex flex-col gap-1 px-1">
        <h3 className="text-[13px] sm:text-sm md:text-lg font-semibold uppercase">
          {product.id}
        </h3>

        <p className="text-black font-bold text-sm sm:text-base md:text-lg">
          ₦{product.price.toLocaleString('en-NG')}
        </p>
      </div>
    </div>
  );
};

export default BestSellerCard;