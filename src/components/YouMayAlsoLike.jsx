import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useWishlist } from '../Context/WishlistContext';

const YouMayAlsoLike = ({ products = [], currentProductId, title = 'You May Also Like' }) => {
  const { toggleWishlist, isWishlisted } = useWishlist();

  /*
   * REMOVE DUPLICATES
   *
   * A product can exist in more than one dataset.
   * We create a unique key using category + id.
   *
   * If your products don't have category, we fall back
   * to name + id.
   */

  // const uniqueProducts = useMemo(() => {
  //   const seen = new Set();

  //   return products.filter((product) => {
  //     const uniqueKey = product.category
  //       ? `${product.category}-${product.id}`
  //       : `${product.name}-${product.id}`;

  //     if (seen.has(uniqueKey)) {
  //       return false;
  //     }

  //     seen.add(uniqueKey);
  //     return true;
  //   });
  // }, [products]);

  const uniqueProducts = useMemo(() => {
    const seen = new Set();

    return products.filter((product) => {
      const uniqueKey = String(product.name || '')
        .trim()
        .toLowerCase();

      if (seen.has(uniqueKey)) {
        return false;
      }

      seen.add(uniqueKey);
      return true;
    });
  }, [products]);

  /*
   * REMOVE CURRENT PRODUCT
   */
  const filteredProducts = useMemo(() => {
    return uniqueProducts.filter((item) => String(item.id) !== String(currentProductId));
  }, [uniqueProducts, currentProductId]);

  /*
   * SHUFFLE PRODUCTS
   *
   * useMemo prevents the recommendations from
   * reshuffling every time the component re-renders.
   */
  const recommendedProducts = useMemo(() => {
    const shuffled = [...filteredProducts].sort(() => Math.random() - 0.5);

    return shuffled.slice(0, 8);
  }, [filteredProducts, currentProductId]);

  /*
   * WISHLIST
   */
  const handleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist({
      ...product,
      route: product.route,
    });
  };

  return (
    <section className='w-full mt-20 px-4 md:px-10'>
      {/* TITLE */}
      <div className='mb-8'>
        <h2 className='text-2xl md:text-3xl font-bold uppercase'>{title}</h2>
      </div>

      {/* PRODUCTS */}
      <div
        className='
          flex
          gap-4
          sm:gap-5
          md:gap-6
          overflow-x-auto
          pb-4
          scrollbar-hide
          snap-x
          snap-mandatory
        '
      >
        {recommendedProducts.map((product, index) => (
          <RecommendationCard
            key={`${product.category || 'product'}-${product.id}-${index}`}
            product={product}
            handleWishlist={handleWishlist}
            isWishlisted={isWishlisted}
          />
        ))}
      </div>
    </section>
  );
};

/* =========================================
   RECOMMENDATION CARD
========================================= */

const RecommendationCard = ({ product, handleWishlist, isWishlisted }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className='
        shrink-0
        snap-start
        w-40
        sm:w-50
        md:w-70
        lg:w-[280px]
      '
    >
      <div
        className='relative overflow-hidden rounded-2xl bg-white'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* WISHLIST */}
        <button
          type='button'
          onClick={(e) => handleWishlist(e, product)}
          className='
            absolute
            top-3
            right-3
            z-20
            bg-white
            p-2
            rounded-full
            shadow-md
          '
          aria-label={isWishlisted(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isWishlisted(product.id) ? (
            <FaHeart className='text-red-500 text-lg' />
          ) : (
            <FaRegHeart className='text-gray-500 text-lg hover:text-red-500' />
          )}
        </button>

        {/* PRODUCT */}
        <Link to={product.route} className='block relative'>
          {/* MAIN IMAGE */}
          <motion.img
            src={product.image}
            alt={product.name}
            className='
              w-full
              object-center
              h-62.5
              sm:h-80
              md:h-95
              lg:h-105
              rounded-2xl
            '
            animate={{
              opacity: isHovered ? 0 : 1,
            }}
            transition={{
              duration: 0.4,
            }}
          />

          {/* HOVER IMAGE */}
          {product.hoverImage && (
            <motion.img
              src={product.hoverImage}
              alt={product.name}
              className='
                absolute
                inset-0
                w-full
                object-center
                h-62.5
                sm:h-80
                md:h-95
                lg:h-105
                rounded-2xl
              '
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{
                duration: 0.4,
              }}
            />
          )}

          {/* OVERLAY */}
          <div
            className={`
              absolute
              inset-0
              bg-black/10
              transition-opacity
              duration-300
              pointer-events-none
              ${isHovered ? 'opacity-100' : 'opacity-0'}
            `}
          />
        </Link>
      </div>

      {/* PRODUCT INFO */}
      <div className='mt-4 flex flex-col gap-1 px-1'>
        <h3
          className='
          text-[13px]
          sm:text-sm
          md:text-base
          font-semibold
          uppercase
        '
        >
          {product.name}
        </h3>

        <p
          className='
          text-black
          font-bold
          text-sm
          sm:text-base
          md:text-lg
        '
        >
          ₦{product.price.toLocaleString('en-NG')}
        </p>
      </div>
    </div>
  );
};

export default YouMayAlsoLike;
