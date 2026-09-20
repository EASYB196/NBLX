// import React, { useState } from 'react';
// import { FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa6';
// import { Link } from 'react-router-dom';

// // eslint-disable-next-line no-unused-vars
// import { motion } from 'framer-motion';

// import { AccessoriesDatas } from '../data/AccessoriesData';
// import { useWishlist } from '../Context/WishlistContext';

// const AccessoriesData = ({ product }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   const { toggleWishlist, isWishlisted } = useWishlist();

//   const handleWishlist = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     toggleWishlist({
//       ...product,
//       route: `/Accessories/${product.id}`,
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
//         <Link to={`/Accessories/${product.id}`}>
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
//             {product.hoverImage && (
//               <motion.img
//                 src={product.hoverImage}
//                 alt={`${product.name} alternate view`}
//                 className='absolute inset-0 w-full h-120 object-cover rounded-xl'
//                 initial={{ opacity: 0 }}
//                 animate={{
//                   opacity: isHovered ? 1 : 0,
//                 }}
//                 transition={{
//                   duration: 0.7,
//                   ease: 'easeInOut',
//                 }}
//               />
//             )}
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
//       <div className='bg-white text-black mt-3 ml-4 md:ml-0'>
//         <h3 className='text-sm md:text-lg font-semibold uppercase'>{product.name}</h3>

//         <p className='text-black font-medium'>₦{product.price.toLocaleString('en-NG')}</p>
//       </div>
//     </div>
//   );
// };

// const Accessories = () => {
//   return (
//     <div className='bg-white mt-23 z-10 pt-10'>
//       {/* PAGE HEADER */}
//       <div className='space-y-7'>
//         <h1 className='text-black text-5xl text-center'>Accessories</h1>

//         {/* BREADCRUMB */}
//         <div className='flex items-center justify-center gap-5'>
//           <Link to='/' className='text-black'>
//             Home
//           </Link>

//           <FaChevronRight className='text-black w-2' />

//           <span className='text-black'>Accessories</span>
//         </div>
//       </div>

//       {/* PRODUCTS GRID */}
//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 p-4 mt-25'>
//         {AccessoriesDatas.map((product) => (
//           <AccessoriesData key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Accessories;
import React, { useMemo, useState } from 'react';
import { FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

import { AccessoriesDatas } from '../data/AccessoriesData';
import { useWishlist } from '../Context/WishlistContext';

import ProductFilterBar from '../components/ProductFilterBar';

/* SINGLE ACCESSORY PRODUCT CARD */
const AccessoriesCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { toggleWishlist, isWishlisted } = useWishlist();

  const productRoute = `/Accessories/${encodeURIComponent(product.id)}`;

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist({
      ...product,
      route: productRoute,
    });
  };

  return (
    <div className='font-serif'>
      {/* PRODUCT IMAGE */}
      <div
        className='relative'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={productRoute}>
          <div className='relative group w-full rounded-lg shadow-lg overflow-hidden bg-white'>
            {/* MAIN IMAGE */}
            <motion.img
              src={product.image}
              alt={product.name}
              className='w-full h-120 object-cover rounded-xl'
              initial={{ opacity: 1 }}
              animate={{
                opacity: isHovered && product.hoverImage ? 0 : 1,
              }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
              }}
            />

            {/* HOVER IMAGE */}
            {product.hoverImage && (
              <motion.img
                src={product.hoverImage}
                alt={`${product.name} alternate view`}
                className='absolute inset-0 w-full h-120 object-cover rounded-xl'
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: 'easeInOut',
                }}
              />
            )}

            {/* HOVER OVERLAY */}
            <div
              className={`absolute inset-0 bg-black/10 transition-opacity duration-300 pointer-events-none ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        </Link>

        {/* WISHLIST */}
        <button
          type='button'
          onClick={handleWishlist}
          aria-label={isWishlisted(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
          className='absolute top-3 right-3 z-20 bg-white p-2.5 rounded-full shadow-md hover:scale-105 transition-transform duration-200'
        >
          {isWishlisted(product.id) ? (
            <FaHeart className='text-red-500 text-lg' />
          ) : (
            <FaRegHeart className='text-gray-500 text-lg hover:text-red-500 transition-colors' />
          )}
        </button>
      </div>

      {/* PRODUCT INFORMATION */}
      <div className='bg-white text-black mt-3'>
        <p className='text-[11px] uppercase tracking-[0.15em] text-gray-500'>NBLX</p>

        <h3 className='text-sm md:text-lg font-semibold uppercase mt-1'>{product.name}</h3>

        <p className='text-black font-medium mt-1'>₦{product.price.toLocaleString('en-NG')}</p>
      </div>
    </div>
  );
};

/* ACCESSORIES PAGE */
const Accessories = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const [sortOption, setSortOption] = useState('featured');

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  /* ACCESSORY CATEGORIES */
  const categories = [
    {
      key: 'all',
      label: 'All',
    },
    {
      key: 'hats',
      label: 'Hats',
    },
    {
      key: 'jewelry',
      label: 'Jewelry',
    },
    {
      key: 'bags',
      label: 'Bags',
    },
    {
      key: 'belts',
      label: 'Belts',
    },
    {
      key: 'watches',
      label: 'Watches',
    },
    {
      key: 'other',
      label: 'Other',
    },
  ];

  /* CATEGORY COUNTS */
  const categoryCounts = useMemo(() => {
    return categories.reduce((counts, category) => {
      if (category.key === 'all') {
        counts.all = AccessoriesDatas.length;
      } else {
        counts[category.key] = AccessoriesDatas.filter(
          (product) => product.category === category.key,
        ).length;
      }

      return counts;
    }, {});
  }, []);

  /* FILTER + SORT PRODUCTS */
  const filteredProducts = useMemo(() => {
    let products =
      activeCategory === 'all'
        ? [...AccessoriesDatas]
        : AccessoriesDatas.filter((product) => product.category === activeCategory);

    switch (sortOption) {
      case 'title-ascending':
        return products.sort((a, b) => a.name.localeCompare(b.name));

      case 'title-descending':
        return products.sort((a, b) => b.name.localeCompare(a.name));

      case 'price-ascending':
        return products.sort((a, b) => a.price - b.price);

      case 'price-descending':
        return products.sort((a, b) => b.price - a.price);

      case 'date-ascending':
        return products.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));

      case 'date-descending':
        return products.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

      case 'best-selling':
        return products.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));

      case 'featured':
      case 'relevant':
      default:
        return products;
    }
  }, [activeCategory, sortOption]);

  /* ACTIVE CATEGORY NAME */
  const activeCategoryLabel =
    categories.find((category) => category.key === activeCategory)?.label || 'Accessories';

  return (
    <div className='bg-white mt-23 z-10 pt-10'>
      {/* PAGE HEADER */}
      <div className='space-y-7 px-4'>
        <h1 className='text-black text-5xl text-center font-serif'>Accessories</h1>

        {/* BREADCRUMB */}
        <div className='flex items-center justify-center gap-5 font-serif'>
          <Link to='/' className='text-black hover:underline'>
            Home
          </Link>

          <FaChevronRight className='text-black w-2' />

          <span className='text-gray-500'>Accessories</span>
        </div>
      </div>

      {/* CATEGORY FILTERS */}
      <div className='mt-14 px-4 md:px-10'>
        <div className='flex flex-wrap justify-center gap-3'>
          {categories.map((category) => {
            const count = categoryCounts[category.key];

            const isAvailable = count > 0;

            return (
              <button
                key={category.key}
                type='button'
                onClick={() => setActiveCategory(category.key)}
                className={`px-5 py-2.5 rounded-full border text-sm font-medium uppercase tracking-wide transition-all duration-300 ${
                  activeCategory === category.key
                    ? 'bg-black text-white border-black'
                    : isAvailable
                      ? 'bg-white text-black border-gray-300 hover:border-black hover:bg-gray-50'
                      : 'bg-white text-gray-400 border-gray-200'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* FILTER & SORT BAR */}
      <ProductFilterBar
        totalProducts={filteredProducts.length}
        sortOption={sortOption}
        setSortOption={setSortOption}
        onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
      />

      {/* PRODUCT GRID */}
      {filteredProducts.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 p-4 md:px-10'>
          {filteredProducts.map((product) => (
            <AccessoriesCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* EMPTY CATEGORY */
        <div className='min-h-60 flex items-center justify-center px-4'>
          <div className='text-center'>
            <p className='text-lg font-semibold text-black'>
              {activeCategoryLabel} Coming Soon
            </p>

            <p className='text-sm text-gray-500 mt-2'>
              New NBLX accessories will be added to this collection soon.
            </p>

            <button
              type='button'
              onClick={() => setActiveCategory('all')}
              className='mt-5 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition'
            >
              View All Accessories
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accessories;
