import React, { useState, useMemo } from 'react';
import { FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa6';
import { Link } from 'react-router-dom'; // eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

import { AccessoriesDatas } from '../data/AccessoriesData';
import { useWishlist } from '../Context/WishlistContext';
import ProductFilterBar from '../components/ProductFilterBar';

import backgroundImage from '../assets/images/accessories.png';

/* -------------------------------------------------------------------------- */
/*                          PRODUCT CARD COMPONENT                            */
/* -------------------------------------------------------------------------- */
const AccessoriesCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isWishlisted } = useWishlist();

  const productRoute = `/Accessories/${encodeURIComponent(product.id)}`;
  const color = product.selectedColor || 'Default';
  const wishlisted = isWishlisted(product.id, color);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist({
      ...product,
      route: productRoute,
      selectedColor: color,
      images: product.images || [product.image, product.hoverImage].filter(Boolean),
      image: product.image,
    });
  };

  return (
    <article className='group relative flex flex-col font-sans'>
      {/* Product Image Container */}
      <div
        className='relative w-full overflow-hidden rounded-xl bg-neutral-100 aspect-[3/4]'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={productRoute} className='block h-full w-full'>
          {/* Main Primary Image */}
          <motion.img
            src={product.image}
            alt={product.name}
            className='h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105'
            initial={{ opacity: 1 }}
            animate={{ opacity: isHovered && product.hoverImage ? 0 : 1 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />

          {/* Secondary Hover Image */}
          {product.hoverImage && (
            <motion.img
              src={product.hoverImage}
              alt={`${product.name} alternate view`}
              className='absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105'
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
          type='button'
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className='absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-sm transition-all duration-200 hover:scale-110 hover:bg-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black'
        >
          <AnimatePresence mode='wait'>
            {wishlisted ? (
              <motion.div
                key='filled'
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.6 }}
              >
                <FaHeart className='h-4 w-4 text-red-500' />
              </motion.div>
            ) : (
              <motion.div
                key='outline'
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.6 }}
              >
                <FaRegHeart className='h-4 w-4 text-neutral-600 transition-colors group-hover:text-black' />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Product Meta Information */}
      <div className='mt-2.5 flex flex-col space-y-0.5 px-0.5'>
        <span className='text-[10px] uppercase tracking-widest text-neutral-400 font-semibold'>
          NBLX
        </span>
        <Link
          to={productRoute}
          className='text-xs sm:text-sm font-medium uppercase tracking-tight text-neutral-900 line-clamp-1 hover:text-neutral-600 transition-colors'
        >
          {product.name}
        </Link>
        <p className='text-xs sm:text-sm font-semibold text-neutral-900'>
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
    <section className='w-full'>
      <div className='relative w-full overflow-hidden bg-black shadow-xl'>
        {/* Background Image Container */}
        <div
          className='absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105'
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden='true'
        />

        {/* Gradient Overlay for Readable Typography */}
        <div
          className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 backdrop-blur-[2px]'
          aria-hidden='true'
        />

        {/* Content Box */}
        <div className='relative flex min-h-[220px] sm:min-h-[300px] flex-col items-center justify-center px-4 py-12 sm:px-8 sm:py-20 text-center'>
          <div className='max-w-3xl space-y-3 sm:space-y-4'>
            <h1 className='text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-white tracking-wide drop-shadow-md'>
              Accessories
            </h1>

            {/* Breadcrumb Navigation */}
            <nav aria-label='Breadcrumb' className='pt-1 sm:pt-2'>
              <ol className='flex items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-serif tracking-widest uppercase text-neutral-300'>
                <li>
                  <Link
                    to='/'
                    className='text-white hover:text-neutral-400 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-sm'
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden='true' className='flex items-center'>
                  <FaChevronRight className='w-2 h-2 sm:w-2.5 sm:h-2.5 text-neutral-400 opacity-70' />
                </li>
                <li>
                  <span className='text-neutral-400 font-normal' aria-current='page'>
                    Accessories
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
/*                         MAIN ACCESSORIES PAGE                              */
/* -------------------------------------------------------------------------- */
const Accessories = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOption, setSortOption] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  /* ACCESSORY CATEGORIES */
  const categories = [
    { key: 'all', label: 'All' },
    { key: 'hats', label: 'Hats' },
    { key: 'jewelry', label: 'Jewelry' },
    { key: 'bags', label: 'Bags' },
    { key: 'belts', label: 'Belts' },
    { key: 'watches', label: 'Watches' },
    { key: 'other', label: 'Other' },
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
    <div className='bg-white min-h-screen'>
      {/* Full-Width Hero Category Header */}
      <HeroBanner />

      {/* CATEGORY FILTERS */}
      <div className='mt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div className='flex flex-wrap justify-center gap-2.5 sm:gap-3'>
          {categories.map((category) => {
            const count = categoryCounts[category.key];
            const isAvailable = count > 0;

            return (
              <button
                key={category.key}
                type='button'
                onClick={() => setActiveCategory(category.key)}
                className={`px-4 sm:px-5 py-2 rounded-full border text-xs sm:text-sm font-medium uppercase tracking-wide transition-all duration-300 ${
                  activeCategory === category.key
                    ? 'bg-black text-white border-black shadow-sm'
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

      {/* STICKY FILTER & SORT BAR */}
      <div className='max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-4 sm:mt-6'>
        <ProductFilterBar
          totalProducts={filteredProducts.length}
          sortOption={sortOption}
          setSortOption={setSortOption}
          onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
        />
      </div>

      {/* PRODUCT GRID OR EMPTY STATE */}
      <main className='max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 mb-16'>
        {filteredProducts.length > 0 ? (
          <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 gap-y-6 sm:gap-y-10'>
            {filteredProducts.map((product) => (
              <AccessoriesCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className='min-h-[280px] flex items-center justify-center px-4'>
            <div className='text-center space-y-3'>
              <p className='text-base sm:text-lg font-semibold text-black'>
                {activeCategoryLabel} Coming Soon
              </p>
              <p className='text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto'>
                New NBLX accessories will be added to this collection soon.
              </p>
              <button
                type='button'
                onClick={() => setActiveCategory('all')}
                className='mt-2 bg-black text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider hover:bg-neutral-800 transition shadow-sm'
              >
                View All Accessories
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Accessories;
