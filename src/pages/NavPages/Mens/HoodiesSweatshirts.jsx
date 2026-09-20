// import React, { useState, useMemo } from 'react';
// import { FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa6';
// import { Link } from 'react-router-dom';
// // eslint-disable-next-line no-unused-vars
// import { motion } from 'framer-motion';

// import { HoodiesSweatshirtsDatas } from '../../../data/HoodiesSweatshirtsData.js';
// import { useWishlist } from '../../../Context/WishlistContext';
// import ProductFilterBar from '../../../components/ProductFilterBar';

// /* SINGLE PRODUCT CARD COMPONENT */
// const HoodiesSweatshirtsCard = ({ product }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const { toggleWishlist, isWishlisted } = useWishlist();

//   const handleWishlist = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     toggleWishlist({
//       ...product,
//       route: `/Hoodies-Sweatshirts/${product.id}`,
//     });
//   };

//   return (
//     <div className="font-serif">
//       {/* PRODUCT IMAGE CONTAINER */}
//       <div
//         className="relative"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <Link to={`/Hoodies-Sweatshirts/${product.id}`}>
//           <div className="relative group rounded-lg shadow-lg overflow-hidden">
//             {/* MAIN IMAGE */}
//             <motion.img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-112.5 object-cover rounded-xl"
//               initial={{ opacity: 1 }}
//               animate={{ opacity: isHovered ? 0 : 1 }}
//               transition={{ duration: 0.5, ease: 'easeInOut' }}
//             />

//             {/* HOVER IMAGE */}
//             <motion.img
//               src={product.hoverImage}
//               alt={`${product.name} alternate view`}
//               className="absolute inset-0 w-full h-112.5 object-cover rounded-xl"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: isHovered ? 1 : 0 }}
//               transition={{ duration: 0.5, ease: 'easeInOut' }}
//             />
//           </div>
//         </Link>

//         {/* ❤️ WISHLIST */}
//         <button
//           type="button"
//           onClick={handleWishlist}
//           aria-label={
//             isWishlisted(product.id) ? 'Remove from wishlist' : 'Add to wishlist'
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

//       {/* PRODUCT DETAILS */}
//       <div className="bg-white text-black mt-3">
//         <h6 className="text-xs text-gray-500">NBLX</h6>
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

// /* MAIN HOODIES & SWEATSHIRTS PAGE COMPONENT */
// const HoodiesSweatshirts = () => {
//   const [sortOption, setSortOption] = useState('featured');
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   // Dynamic sorting function at page level
//   const sortedProducts = useMemo(() => {
//     let sorted = [...HoodiesSweatshirtsDatas];

//     switch (sortOption) {
//       case 'title-ascending':
//         return sorted.sort((a, b) => a.name.localeCompare(b.name));
//       case 'title-descending':
//         return sorted.sort((a, b) => b.name.localeCompare(a.name));
//       case 'price-ascending':
//         return sorted.sort((a, b) => a.price - b.price);
//       case 'price-descending':
//         return sorted.sort((a, b) => b.price - a.price);
//       case 'date-ascending':
//         return sorted.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
//       case 'date-descending':
//         return sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
//       case 'best-selling':
//         return sorted.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
//       case 'featured':
//       case 'relevant':
//       default:
//         return sorted;
//     }
//   }, [sortOption]);

//   return (
//     <div className="bg-white mt-23 pt-10 min-h-screen">
//       {/* HEADER */}
//       <div className="space-y-7 mb-10">
//         <h1 className="text-black text-3xl md:text-5xl text-center font-serif">
//           Hoodies & Sweatshirts
//         </h1>

//         {/* BREADCRUMB */}
//         <div className="flex items-center justify-center gap-3 font-serif">
//           <Link to="/" className="text-black hover:text-gray-600">
//             Home
//           </Link>
//           <FaChevronRight className="text-black text-xs" />
//           <span className="text-gray-500">Hoodies & Sweatshirts</span>
//         </div>
//       </div>

//       {/* SINGLE FILTER & SORT BAR */}
//       <ProductFilterBar
//         totalProducts={sortedProducts.length}
//         sortOption={sortOption}
//         setSortOption={setSortOption}
//         onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
//       />

//       {/* PRODUCTS GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-6 mt-6">
//         {sortedProducts.map((product) => (
//           <HoodiesSweatshirtsCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HoodiesSweatshirts;

import React, { useState, useMemo } from 'react';
import { FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

import { HoodiesSweatshirtsDatas } from '../../../data/HoodiesSweatshirtsData.js';
import { useWishlist } from '../../../Context/WishlistContext';
import ProductFilterBar from '../../../components/ProductFilterBar';

/* SINGLE PRODUCT CARD COMPONENT */
const HoodiesSweatshirtsCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isWishlisted } = useWishlist();

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist({
      ...product,
      route: `/Hoodies-Sweatshirts/${product.id}`,
      selectedColor: product.selectedColor || 'Default',
      images:
        product.images ||
        [product.image, product.hoverImage].filter(Boolean),
      image: product.image,
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
              animate={{ opacity: isHovered ? 0 : 1 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />

            {/* HOVER IMAGE */}
            <motion.img
              src={product.hoverImage}
              alt={`${product.name} alternate view`}
              className="absolute inset-0 w-full h-112.5 object-cover rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>
        </Link>

        {/* ❤️ WISHLIST */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            isWishlisted(
              product.id,
              product.selectedColor || 'Default',
            )
              ? 'Remove from wishlist'
              : 'Add to wishlist'
          }
          className="absolute top-3 right-3 z-20 bg-white p-2.5 rounded-full shadow-md hover:scale-105 transition-transform duration-200"
        >
          {isWishlisted(
            product.id,
            product.selectedColor || 'Default',
          ) ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <FaRegHeart className="text-gray-500 text-lg hover:text-red-500 transition-colors" />
          )}
        </button>
      </div>

      {/* PRODUCT DETAILS */}
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

/* MAIN HOODIES & SWEATSHIRTS PAGE COMPONENT */
const HoodiesSweatshirts = () => {
  const [sortOption, setSortOption] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Dynamic sorting function at page level
  const sortedProducts = useMemo(() => {
    let sorted = [...HoodiesSweatshirtsDatas];

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
        return sorted.sort(
          (a, b) =>
            new Date(a.createdAt || 0) -
            new Date(b.createdAt || 0),
        );

      case 'date-descending':
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0),
        );

      case 'best-selling':
        return sorted.sort(
          (a, b) =>
            (b.salesCount || 0) -
            (a.salesCount || 0),
        );

      case 'featured':
      case 'relevant':
      default:
        return sorted;
    }
  }, [sortOption]);

  return (
    <div className="bg-white mt-23 pt-10 min-h-screen">
      {/* HEADER */}
      <div className="space-y-7 mb-10">
        <h1 className="text-black text-3xl md:text-5xl text-center font-serif">
          Hoodies & Sweatshirts
        </h1>

        {/* BREADCRUMB */}
        <div className="flex items-center justify-center gap-3 font-serif">
          <Link
            to="/"
            className="text-black hover:text-gray-600"
          >
            Home
          </Link>

          <FaChevronRight className="text-black text-xs" />

          <span className="text-gray-500">
            Hoodies & Sweatshirts
          </span>
        </div>
      </div>

      {/* SINGLE FILTER & SORT BAR */}
      <ProductFilterBar
        totalProducts={sortedProducts.length}
        sortOption={sortOption}
        setSortOption={setSortOption}
        onToggleFilter={() =>
          setIsFilterOpen(!isFilterOpen)
        }
      />

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-6 mt-6">
        {sortedProducts.map((product) => (
          <HoodiesSweatshirtsCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default HoodiesSweatshirts;