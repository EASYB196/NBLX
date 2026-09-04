// import React, { useState } from 'react';
// import { FaChevronRight } from 'react-icons/fa6';
// import { Link } from 'react-router-dom';
// // eslint-disable-next-line no-unused-vars
// import { motion } from 'framer-motion';
// import { FaEye, FaShoppingCart } from 'react-icons/fa';
// import { HoodiesSweatshirtsDatas } from '../../../data/HoodiesSweatshirtsData.js';

// const HoodiesSweatshirtsData = ({ product }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div className='font-serif'>
//       <Link to={`/Hoodies-Sweatshirts/${product.id}`}>
//         <div
//           className='relative group rounded-lg shadow-lg overflow-hidden'
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           {/* Main Image */}
//           <motion.img
//             src={product.image}
//             alt={product.name}
//             className='w-full h-112.5 object-cover rounded-xl'
//             initial={{ opacity: 1 }}
//             animate={{ opacity: isHovered ? 0 : 1 }}
//             transition={{ duration: 0.5, ease: 'easeInOut' }}
//           />

//           {/* Hover Image */}
//           <motion.img
//             src={product.hoverImage}
//             alt={product.name}
//             className='absolute inset-0 w-full h-112.5 object-cover rounded-xl'
//             initial={{ opacity: 0 }}
//             animate={{ opacity: isHovered ? 1 : 0 }}
//             transition={{ duration: 0.5, ease: 'easeInOut' }}
//           />

//           {/* NEW Badge */}
//           <span className='absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full'>
//             NEW
//           </span>

//           {/* Action Buttons */}
//           <div
//             className={`absolute inset-0 flex flex-col items-end justify-center pr-4 gap-3 transition-all duration-300 ${
//               isHovered ? 'opacity-100' : 'opacity-0'
//             }`}
//           >
//             <button
//               type='button'
//               className='bg-white p-3 rounded-full shadow-md hover:scale-110 transition'
//             >
//               <FaEye className='text-gray-800' size={16} />
//             </button>

//             <button
//               type='button'
//               className='bg-white p-3 rounded-full shadow-md hover:scale-110 transition'
//             >
//               <FaShoppingCart className='text-gray-800' size={16} />
//             </button>
//           </div>
//         </div>
//       </Link>

//       {/* Product Details */}
//       <div className='bg-white text-black mt-3'>
//         <h3 className='text-sm md:text-lg font-semibold uppercase'>{product.name}</h3>

//         <p className='text-black font-medium'>₦{product.price.toLocaleString('en-NG')}</p>
//       </div>
//     </div>
//   );
// };

// const HoodiesSweatshirts = () => {
//   return (
//     <div className='bg-white mt-23 pt-10 min-h-screen'>
//       {/* Header */}
//       <div className='space-y-7'>
//         <h1 className='text-black text-3xl md:text-5xl text-center'>Hoodies & Sweatshirts</h1>

//         <div className='flex items-center justify-center gap-3'>
//           <Link to='/' className='text-black hover:text-gray-600'>
//             Home
//           </Link>

//           <FaChevronRight className='text-black text-xs' />

//           <span className='text-black'>Hoodies & Sweatshirts</span>
//         </div>
//       </div>

//       {/* Products Grid */}
//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-6 mt-12'>
//         {HoodiesSweatshirtsDatas.map((product) => (
//           <HoodiesSweatshirtsData key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HoodiesSweatshirts;



import React, { useState } from 'react';
import { FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

import { HoodiesSweatshirtsDatas } from '../../../data/HoodiesSweatshirtsData.js';
import { useWishlist } from '../../../Context/WishlistContext';

const HoodiesSweatshirtsData = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { toggleWishlist, isWishlisted } = useWishlist();

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist({
      ...product,
      route: `/Hoodies-Sweatshirts/${product.id}`,
    });
  };

  return (
    <div className="font-serif">
      {/* PRODUCT IMAGE CONTAINER */}
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={`/Hoodies-Sweatshirts/${product.id}`}>
          <div className="relative group rounded-lg shadow-lg overflow-hidden">

            {/* MAIN IMAGE */}
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-112.5 object-cover rounded-xl"
              initial={{ opacity: 1 }}
              animate={{
                opacity: isHovered ? 0 : 1,
              }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
              }}
            />

            {/* HOVER IMAGE */}
            <motion.img
              src={product.hoverImage}
              alt={`${product.name} alternate view`}
              className="absolute inset-0 w-full h-112.5 object-cover rounded-xl"
              initial={{ opacity: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
              }}
            />
          </div>
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
          className="absolute top-3 right-3 z-20 bg-white p-2.5 rounded-full shadow-md hover:scale-105 transition-transform duration-200"
        >
          {isWishlisted(product.id) ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <FaRegHeart className="text-gray-500 text-lg hover:text-red-500 transition-colors" />
          )}
        </button>
      </div>

      {/* PRODUCT DETAILS */}
      <div className="bg-white text-black mt-3">
        <h3 className="text-sm md:text-lg font-semibold uppercase">
          {product.name}
        </h3>

        <p className="text-black font-medium">
          ₦{product.price.toLocaleString('en-NG')}
        </p>
      </div>
    </div>
  );
};

const HoodiesSweatshirts = () => {
  return (
    <div className="bg-white mt-23 pt-10 min-h-screen">

      {/* HEADER */}
      <div className="space-y-7">
        <h1 className="text-black text-3xl md:text-5xl text-center">
          Hoodies & Sweatshirts
        </h1>

        {/* BREADCRUMB */}
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="text-black hover:text-gray-600"
          >
            Home
          </Link>

          <FaChevronRight className="text-black text-xs" />

          <span className="text-black">
            Hoodies & Sweatshirts
          </span>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-6 mt-12">
        {HoodiesSweatshirtsDatas.map((product) => (
          <HoodiesSweatshirtsData
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default HoodiesSweatshirts;