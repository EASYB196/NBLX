// // import React, { useState } from 'react';
// // import { FaChevronRight } from 'react-icons/fa6';
// // import { Link } from 'react-router-dom';
// // // eslint-disable-next-line no-unused-vars
// // import { motion } from 'framer-motion';
// // import { FaEye, FaShoppingCart } from 'react-icons/fa';
// // import { FemalePantDatas } from '../../../data/FemalePant';

// // const FemalePantData = ({ product }) => {
// //   const [isHovered, setIsHovered] = useState(false);

// //   return (
// //     <div className='md:px-5 font-serif'>
// //       <Link to={`/female-pant/${product.id}`}>
// //         <div
// //           className='relative group w-90 md:w-84   rounded-lg  shadow-lg'
// //           onMouseEnter={() => setIsHovered(true)}
// //           onMouseLeave={() => setIsHovered(false)}
// //         >
// //           <motion.img
// //             src={product.image}
// //             alt={product.name}
// //             className={`w-100  md:w-full h-120 md:h-120 object-cover transition-transform rounded-xl duration-300 ml-3 md:ml-0`}
// //             initial={{ opacity: 1 }}
// //             animate={{ opacity: isHovered ? 0 : 1 }}
// //             transition={{ duration: 0.5, ease: 'easeInOut' }}
// //           />

// //           <motion.img
// //             src={product.hoverImage}
// //             alt={product.name}
// //             className='absolute top-0 left-0 w-full h-120 object-cover rounded-xl ml-3 md:ml-0'
// //             initial={{ opacity: 0, scale: 1 }}
// //             animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 1 }}
// //             transition={{ duration: 0.9, ease: 'easeInOut' }}
// //           />

// //           <h3 className='text-sm font-semibold  text-black px-1 bg-red-400 rounded-xl w-13 text-center relative bottom-118 left-2 ml-3 md:ml-0'>
// //             NEW
// //           </h3>

// //           <div
// //             className={`absolute inset-0 flex flex-col space-y-2  items-center justify-center space-x-4 transition-transform duration-300 ${
// //               isHovered ? 'opacity-100' : 'opacity-0'
// //             }`}
// //           >
// //             <button className='bg-white p-4 rounded-full cursor-pointer shadow-md hover:bg-gray-100 transition relative left-38 md:left-35 bottom-45'>
// //               <FaEye size={15} className='text-gray-800 ' />
// //             </button>
// //             <button className='bg-white p-4 rounded-full cursor-pointer shadow-md hover:bg-gray-100 transition relative left-36 md:left-33 bottom-45'>
// //               <FaShoppingCart size={15} className='text-gray-800' />
// //             </button>
// //           </div>
// //         </div>
// //       </Link>

// //       <div className=' bg-white text-black ml-4 md:ml-0'>
// //         <h3 className='text-sm md:text-lg font-semibold uppercase'>{product.name}</h3>
// //         <p className='text-black'>₦{product.price.toLocaleString('en-NG')}</p>
// //       </div>
// //     </div>
// //   );
// // };
// // const FemalePant = () => {
// //   return (
// //     <div className='bg-white mt-23 z-10 pt-10'>
// //       <div className='space-y-7'>
// //         <h1 className='text-black text-5xl text-center '>FemalePants</h1>

// //         <div className='flex items-center justify-center gap-5'>
// //           <Link to={'/'} className='text-black'>
// //             Home
// //           </Link>{' '}
// //           <FaChevronRight className='text-black w-2' />{' '}
// //           <span className='text-black'>Female Pant</span>
// //         </div>
// //       </div>

// //       <div className='grid grid-col md:grid-cols-4 gap-5 p-4 mt-25'>
// //         {FemalePantDatas.map((product) => (
// //           <FemalePantData key={product.id} product={product} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default FemalePant;

// import React, { useState } from 'react';
// import { FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa6';
// import { Link } from 'react-router-dom';

// // eslint-disable-next-line no-unused-vars
// import { motion } from 'framer-motion';

// import { FemalePantDatas } from '../../../data/FemalePant';
// import { useWishlist } from '../../../Context/WishlistContext';

// const FemalePantData = ({ product }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   const { toggleWishlist, isWishlisted } = useWishlist();

//   const handleWishlist = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     toggleWishlist({
//       ...product,
//       route: `/female-pant/${product.id}`,
//     });
//   };

//   return (
//     <div className="md:px-5 font-serif">
//       {/* PRODUCT IMAGE CONTAINER */}
//       <div
//         className="relative"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <Link to={`/female-pant/${product.id}`}>
//           <div className="relative group w-90 md:w-84 rounded-lg shadow-lg overflow-hidden">

//             {/* MAIN IMAGE */}
//             <motion.img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-120 md:h-120 object-cover rounded-xl"
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
//               className="absolute inset-0 w-full h-120 object-cover rounded-xl"
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
//           type="button"
//           onClick={handleWishlist}
//           aria-label={
//             isWishlisted(product.id)
//               ? 'Remove from wishlist'
//               : 'Add to wishlist'
//           }
//           className="absolute top-3 right-3 z-20 bg-white p-2.5 rounded-full shadow-md hover:scale-105 transition-transform duration-200"
//         >
//           {isWishlisted(product.id) ? (
//             <FaHeart className="text-red-500 text-lg" />
//           ) : (
//             <FaRegHeart className="text-gray-500 text-lg hover:text-red-500 transition-colors" />
//           )}
//         </button>
//       </div>

//       {/* PRODUCT INFORMATION */}
//       <div className="bg-white text-black mt-3 ml-4 md:ml-0">
//             <h6 className='text-xs text-gray-500'>NBLX</h6>

//         <h3 className="text-sm md:text-lg font-semibold uppercase">
//           {product.name}
//         </h3>

//         <p className="text-black font-medium">
//           ₦{product.price.toLocaleString('en-NG')}
//         </p>
//       </div>
//     </div>
//   );
// };

// const FemalePant = () => {
//   return (
//     <div className="bg-white mt-23 z-10 pt-10">

//       {/* PAGE HEADER */}
//       <div className="space-y-7">
//         <h1 className="text-black text-5xl text-center">
//           FemalePants
//         </h1>

//         {/* BREADCRUMB */}
//         <div className="flex items-center justify-center gap-5">
//           <Link to="/" className="text-black">
//             Home
//           </Link>

//           <FaChevronRight className="text-black w-2" />

//           <span className="text-black">
//             Female Pant
//           </span>
//         </div>
//       </div>

//       {/* PRODUCTS GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 p-4 mt-25">
//         {FemalePantDatas.map((product) => (
//           <FemalePantData
//             key={product.id}
//             product={product}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FemalePant;
import React, { useState, useMemo } from 'react';
import { FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

import { FemalePantDatas } from '../../../data/FemalePant';
import { useWishlist } from '../../../Context/WishlistContext';
import ProductFilterBar from '../../../components/ProductFilterBar';

/* SINGLE PRODUCT CARD COMPONENT */
const FemalePantCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isWishlisted } = useWishlist();

  const productId = product.id || product.skirid;

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist({
      ...product,
      route: `/female-pant/${productId}`,
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
        <Link to={`/female-pant/${productId}`}>
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
            isWishlisted(productId)
              ? 'Remove from wishlist'
              : 'Add to wishlist'
          }
          className="absolute top-3 right-3 z-20 bg-white p-2.5 rounded-full shadow-md hover:scale-105 transition-transform duration-200"
        >
          {isWishlisted(productId) ? (
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

/* MAIN FEMALE PANTS PAGE COMPONENT */
const FemalePant = () => {
  const [sortOption, setSortOption] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Dynamic sorting function at page level
  const sortedProducts = useMemo(() => {
    let sorted = [...FemalePantDatas];

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
    <div className="bg-white mt-23 z-10 pt-10 min-h-screen">
      {/* PAGE HEADER */}
      <div className="space-y-7 mb-10">
        <h1 className="text-black text-3xl md:text-5xl text-center font-serif">
          Female Pants
        </h1>

        {/* BREADCRUMB */}
        <div className="flex items-center justify-center gap-5 font-serif">
          <Link to="/" className="text-black hover:text-gray-600">
            Home
          </Link>
          <FaChevronRight className="text-black text-xs" />
          <span className="text-gray-500">Female Pants</span>
        </div>
      </div>

      {/* SINGLE FILTER & SORT BAR */}
      <ProductFilterBar
        totalProducts={sortedProducts.length}
        sortOption={sortOption}
        setSortOption={setSortOption}
        onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
      />

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4 md:px-10 mt-6">
        {sortedProducts.map((product) => (
          <FemalePantCard key={product.id || product.skirid} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FemalePant;