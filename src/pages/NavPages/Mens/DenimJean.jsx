import React, { useState, useMemo } from 'react';
import { FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa6';
import { Link } from 'react-router-dom'; 
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

import { DenimJeansDatas } from '../../../data/DenimJeanData';
import { useWishlist } from '../../../Context/WishlistContext';
import ProductFilterBar from '../../../components/ProductFilterBar';

import backgroundImage from '../../../assets/images/trax_showroom.webp';

/* -------------------------------------------------------------------------- */
/*                          PRODUCT CARD COMPONENT                            */
/* -------------------------------------------------------------------------- */
const DenimJeanCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isWishlisted } = useWishlist();

  const color = product.selectedColor || 'Default';
  const wishlisted = isWishlisted(product.id, color);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist({
      ...product,
      route: `/Denim-Jeans/${product.id}`,
      selectedColor: color,
      images:
        product.images ||
        [product.image, product.hoverImage].filter(Boolean),
      image: product.image,
    });
  };

  return (
    <article className="group relative flex flex-col font-sans">
      {/* Product Image Container */}
      <div
        className="relative w-full overflow-hidden rounded-xl bg-neutral-100 aspect-[3/4]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={`/Denim-Jeans/${product.id}`} className="block h-full w-full">
          {/* Main Primary Image */}
          <motion.img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            initial={{ opacity: 1 }}
            animate={{ opacity: isHovered && product.hoverImage ? 0 : 1 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />

          {/* Secondary Hover Image */}
          {product.hoverImage && (
            <motion.img
              src={product.hoverImage}
              alt={`${product.name} alternate view`}
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
          )}

          {/* Dynamic Dark Overlay on Hover */}
          <div
            className={`absolute inset-0 bg-black/10 transition-opacity duration-300 pointer-events-none ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </Link>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-sm transition-all duration-200 hover:scale-110 hover:bg-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          <AnimatePresence mode="wait">
            {wishlisted ? (
              <motion.div
                key="filled"
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.6 }}
              >
                <FaHeart className="h-4 w-4 text-red-500" />
              </motion.div>
            ) : (
              <motion.div
                key="outline"
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.6 }}
              >
                <FaRegHeart className="h-4 w-4 text-neutral-600 transition-colors group-hover:text-black" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Product Meta Information */}
      <div className="mt-2.5 flex flex-col space-y-0.5 px-0.5">
        <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">
          NBLX
        </span>
        <Link
          to={`/Denim-Jeans/${product.id}`}
          className="text-xs sm:text-sm font-medium uppercase tracking-tight text-neutral-900 line-clamp-1 hover:text-neutral-600 transition-colors"
        >
          {product.name}
        </Link>
        <p className="text-xs sm:text-sm font-semibold text-neutral-900">
          ₦{product.price.toLocaleString('en-NG')}
        </p>
      </div>
    </article>
  );
};

/* -------------------------------------------------------------------------- */
/*                         FULL-WIDTH HERO BANNER                             */
/* -------------------------------------------------------------------------- */
const HeroBanner = () => {
  return (
    <section className="w-full">
      <div className="relative w-full overflow-hidden bg-black shadow-xl">
        {/* Background Image Container */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />

        {/* Gradient Overlay for Readable Typography */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 backdrop-blur-[2px]"
          aria-hidden="true"
        />

        {/* Content Box */}
        <div className="relative flex min-h-[220px] sm:min-h-[300px] flex-col items-center justify-center px-4 py-12 sm:px-8 sm:py-20 text-center">
          <div className="max-w-3xl space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-white tracking-wide drop-shadow-md">
              Denim & Jeans
            </h1>

            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="pt-1 sm:pt-2">
              <ol className="flex items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-serif tracking-widest uppercase text-neutral-300">
                <li>
                  <Link
                    to="/"
                    className="text-white hover:text-neutral-400 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-sm"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="flex items-center">
                  <FaChevronRight className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-neutral-400 opacity-70" />
                </li>
                <li>
                  <span className="text-neutral-400 font-normal" aria-current="page">
                    Denim & Jeans
                  </span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/*                       MAIN DENIM & JEANS PAGE COMPONENT                    */
/* -------------------------------------------------------------------------- */
const DenimJean = () => {
  const [sortOption, setSortOption] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Dynamic sorting implementation
  const sortedProducts = useMemo(() => {
    let sorted = [...DenimJeansDatas];

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
            new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
        );
      case 'date-descending':
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
      case 'best-selling':
        return sorted.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
      case 'featured':
      case 'relevant':
      default:
        return sorted;
    }
  }, [sortOption]);

  return (
    <div className="bg-white min-h-screen">
      {/* Full-Width Hero Category Header */}
      <HeroBanner />

      {/* Sticky Filter & Sort Controls */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-4 sm:mt-6">
        <ProductFilterBar
          totalProducts={sortedProducts.length}
          sortOption={sortOption}
          setSortOption={setSortOption}
          onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
        />
      </div>

      {/* Main Grid Section */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 mb-16">
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 gap-y-6 sm:gap-y-10">
            {sortedProducts.map((product) => (
              <DenimJeanCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-neutral-500">
            <p className="text-base sm:text-lg">No products found in this category.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DenimJean;