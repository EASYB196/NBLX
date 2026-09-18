
// import React, { useState } from 'react';
// import { FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa6';
// import { Link } from 'react-router-dom';
// // eslint-disable-next-line no-unused-vars
// import { motion } from 'framer-motion';

// import { PantsDatas } from '../../../data/PantsData';
// import { useWishlist } from '../../../Context/WishlistContext';

// const PantsData = ({ product }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   const { toggleWishlist, isWishlisted } = useWishlist();

//   const handleWishlist = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     toggleWishlist({
//       ...product,
//       route: `/pants/${product.id}`,
//     });
//   };

//   return (
//     <div className='md:px-5 font-serif'>
//       {/* PRODUCT IMAGE CONTAINER */}
//       <div
//         className='relative'
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <Link to={`/pants/${product.id}`}>
//           <div className='relative group w-90 md:w-84 rounded-lg shadow-lg overflow-hidden'>
//             {/* MAIN IMAGE */}
//             <motion.img
//               src={product.image}
//               alt={product.name}
//               className='w-full h-120 md:h-120 object-cover rounded-xl'
//               initial={{ opacity: 1 }}
//               animate={{
//                 opacity: isHovered ? 0 : 1,
//               }}
//               transition={{
//                 duration: 0.5,
//                 ease: 'easeInOut',
//               }}
//             />

//             {/* HOVER IMAGE */}
//             <motion.img
//               src={product.hoverImage}
//               alt={`${product.name} alternate view`}
//               className='absolute inset-0 w-full h-120 object-cover rounded-xl'
//               initial={{ opacity: 0 }}
//               animate={{
//                 opacity: isHovered ? 1 : 0,
//               }}
//               transition={{
//                 duration: 0.7,
//                 ease: 'easeInOut',
//               }}
//             />
//           </div>
//         </Link>

//         {/* ❤️ WISHLIST */}
//         <button
//           type='button'
//           onClick={handleWishlist}
//           aria-label={isWishlisted(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
//           className='absolute top-3 right-3 z-20 bg-white p-2.5 rounded-full shadow-md hover:scale-105 transition-transform duration-200'
//         >
//           {isWishlisted(product.id) ? (
//             <FaHeart className='text-red-500 text-lg' />
//           ) : (
//             <FaRegHeart className='text-gray-500 text-lg hover:text-red-500 transition-colors' />
//           )}
//         </button>
//       </div>

//       {/* PRODUCT INFORMATION */}
//       <div className='bg-white text-black mt-3'>
//         <h6 className='text-xs text-gray-500'>NBLX</h6>

//         <h3 className='text-sm md:text-lg font-semibold uppercase'>{product.name}</h3>

//         <p className='text-black font-medium'>₦{product.price.toLocaleString('en-NG')}</p>
//       </div>
//     </div>
//   );
// };

// const Pants = () => {
//   return (
//     <div className='bg-white mt-23 z-10 pt-10'>
//       {/* PAGE HEADER */}
//       <div className='space-y-7'>
//         <h1 className='text-black text-5xl text-center'>Pants</h1>

//         {/* BREADCRUMB */}
//         <div className='flex items-center justify-center gap-5'>
//           <Link to='/' className='text-black'>
//             Home
//           </Link>

//           <FaChevronRight className='text-black w-2' />

//           <span className='text-black'>Pants</span>
//         </div>
//       </div>

//       {/* PRODUCTS */}
//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 p-4 mt-25'>
//         {PantsDatas.map((product) => (
//           <PantsData key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Pants;

import React, { useState, useMemo } from 'react';
import { FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

import { PantsDatas } from '../../../data/PantsData';
import { useWishlist } from '../../../Context/WishlistContext';
import ProductFilterBar from '../../../components/ProductFilterBar';

/* SINGLE PRODUCT CARD COMPONENT */
const PantsCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isWishlisted } = useWishlist();

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist({
      ...product,
      route: `/pants/${product.id}`,
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
        <Link to={`/pants/${product.id}`}>
          <div className="relative group w-full rounded-lg shadow-lg overflow-hidden">
            {/* MAIN IMAGE */}
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-120 object-cover rounded-xl"
              initial={{ opacity: 1 }}
              animate={{ opacity: isHovered ? 0 : 1 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />

            {/* HOVER IMAGE */}
            <motion.img
              src={product.hoverImage}
              alt={`${product.name} alternate view`}
              className="absolute inset-0 w-full h-120 object-cover rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            />
          </div>
        </Link>

        {/* ❤️ WISHLIST */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            isWishlisted(product.id) ? 'Remove from wishlist' : 'Add to wishlist'
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

      {/* PRODUCT INFORMATION */}
      <div className="bg-white text-black mt-3">
        <h6 className="text-xs text-gray-500">NBLX</h6>
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

/* MAIN PANTS PAGE COMPONENT */
const Pants = () => {
  const [sortOption, setSortOption] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Dynamic sorting function at page level
  const sortedProducts = useMemo(() => {
    let sorted = [...PantsDatas];

    switch (sortOption) {
      case 'title-ascending':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'title-descending':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'price-ascending':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-descending':
        return sorted.sort((a, b) => b.price - a.price);
      case 'date-ascending':
        return sorted.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
      case 'date-descending':
        return sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      case 'best-selling':
        return sorted.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
      case 'featured':
      case 'relevant':
      default:
        return sorted;
    }
  }, [sortOption]);

  return (
    <div className="bg-white mt-23 z-10 pt-10">
      {/* PAGE HEADER */}
      <div className="space-y-7 mb-10">
        <h1 className="text-black text-5xl text-center font-serif">Pants</h1>

        {/* BREADCRUMB */}
        <div className="flex items-center justify-center gap-5 font-serif">
          <Link to="/" className="text-black hover:underline">
            Home
          </Link>
          <FaChevronRight className="text-black w-2" />
          <span className="text-gray-500">Pants</span>
        </div>
      </div>

      {/* SINGLE FILTER & SORT BAR FOR PANTS PAGE */}
      <ProductFilterBar
        totalProducts={sortedProducts.length}
        sortOption={sortOption}
        setSortOption={setSortOption}
        onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
      />

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4 md:px-10 mt-6">
        {sortedProducts.map((product) => (
          <PantsCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Pants;