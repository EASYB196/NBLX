
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

  const wishlisted = isWishlisted(
    product.id,
    product.selectedColor || 'Default',
  );

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist({
      ...product,
      route: productRoute,
      selectedColor: product.selectedColor || 'Default',
      images:
        product.images ||
        [product.image, product.hoverImage].filter(Boolean),
      image: product.image,
    });
  };

  const imageClass =
    'block w-full h-[250px] min-[480px]:h-[280px] sm:h-80 md:h-105 lg:h-120 object-cover object-center rounded-2xl';

  return (
    <div className="w-full min-w-0">
      {/* PRODUCT IMAGE */}
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link
          to={productRoute}
          aria-label={`View ${product.id}`}
          className="relative block w-full"
        >
          {/* MAIN IMAGE */}
          <motion.img
            src={product.image}
            alt={product.id}
            className={imageClass}
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
              alt={`${product.id} alternate view`}
              className={`absolute inset-0 ${imageClass}`}
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{
                duration: 0.4,
              }}
            />
          )}

          {/* IMAGE OVERLAY */}
          <div
            className={`pointer-events-none absolute inset-0 rounded-2xl bg-black/10 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </Link>

        {/* WISHLIST BUTTON */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            wishlisted
              ? 'Remove from wishlist'
              : 'Add to wishlist'
          }
          aria-pressed={wishlisted}
          className="
            absolute right-2.5 top-2.5 z-20
            flex items-center justify-center
            rounded-full bg-white p-2
            shadow-md transition-transform duration-200
            hover:scale-105
            sm:right-3 sm:top-3
          "
        >
          {wishlisted ? (
            <FaHeart className="text-base text-red-500 sm:text-lg" />
          ) : (
            <FaRegHeart className="text-base text-gray-500 transition-colors hover:text-red-500 sm:text-lg" />
          )}
        </button>
      </div>

      {/* PRODUCT INFORMATION */}
      <div className="mt-3 flex min-w-0 flex-col gap-1 px-0.5 sm:mt-4 sm:px-1">
        <h3 className="truncate text-[12px] font-semibold uppercase sm:text-sm md:text-lg">
          {product.id}
        </h3>

        <p className="text-sm font-bold text-black sm:text-base md:text-lg">
          ₦{Number(product.price).toLocaleString('en-NG')}
        </p>
      </div>
    </div>
  );
};

export default BestSellerCard;
