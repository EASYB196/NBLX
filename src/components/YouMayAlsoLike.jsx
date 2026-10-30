import React, { memo, useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useWishlist } from '../Context/WishlistContext';

const MAX_RECOMMENDATIONS = 8;

/* =========================================
   HELPERS
========================================= */

const normalizeProductName = (name) =>
  String(name ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');

const getUniqueProducts = (products) => {
  const seenNames = new Set();

  return products.filter((product) => {
    if (!product || typeof product !== 'object') {
      return false;
    }

    const name = normalizeProductName(product.name);

    // Preserve the original name-based duplicate prevention.
    if (name && seenNames.has(name)) {
      return false;
    }

    if (name) {
      seenNames.add(name);
    }

    return true;
  });
};

const formatPrice = (price) => {
  if (price == null || price === '') {
    return null;
  }

  const numericPrice = Number(price);

  return Number.isFinite(numericPrice) ? `₦${numericPrice.toLocaleString('en-NG')}` : null;
};

/* =========================================
   YOU MAY ALSO LIKE
========================================= */

const YouMayAlsoLike = ({ products = [], currentProductId, title = 'You May Also Like' }) => {
  const { toggleWishlist, isWishlisted } = useWishlist();

  /*
   * Keep the recommendation order stable while this component
   * stays mounted and receives the same products array.
   *
   * Do not shuffle the recommendations on every product change.
   */
  const stableRecommendations = useMemo(
    () => getUniqueProducts(products).slice(0, MAX_RECOMMENDATIONS),
    [products],
  );

  /*
   * Only hide the currently viewed product.
   * The remaining recommendations retain their original order.
   */
  const recommendedProducts = useMemo(
    () =>
      stableRecommendations.filter(
        (product) => String(product.id) !== String(currentProductId),
      ),
    [stableRecommendations, currentProductId],
  );

  const handleWishlist = useCallback(
    (event, product) => {
      event.preventDefault();
      event.stopPropagation();

      toggleWishlist({
        ...product,
        route: product.route,
      });
    },
    [toggleWishlist],
  );

  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby='you-may-also-like-title'
      className='mt-14 w-full min-w-0 px-4 sm:mt-16 sm:px-6 md:mt-20 md:px-10 lg:mt-24'
    >
      <div className='mx-auto w-full max-w-[1600px] min-w-0'>
        {/* Heading */}
        <header className='mb-5 flex min-w-0 items-end justify-between gap-3 sm:mb-7 md:mb-8'>
          <div className='min-w-0'>
            <h2
              id='you-may-also-like-title'
              className='break-words text-xl font-bold uppercase leading-tight tracking-tight sm:text-2xl md:text-3xl'
            >
              {title}
            </h2>
          </div>
        </header>

        {/* Horizontal carousel with hidden scrollbar */}
        <div
          role='region'
          aria-label='Recommended products'
          tabIndex={0}
          className='w-full min-w-0 snap-x snap-mandatory overflow-x-auto overscroll-x-contain pb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 [&::-webkit-scrollbar]:hidden'
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className='flex w-max min-w-full items-start gap-3 sm:gap-4 md:gap-5 lg:gap-6'>
            {recommendedProducts.map((product, index) => (
              <RecommendationCard
                key={`${normalizeProductName(product.name) || product.id || 'product'}-${index}`}
                product={product}
                handleWishlist={handleWishlist}
                isWishlisted={isWishlisted}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================
   RECOMMENDATION CARD
========================================= */

const RecommendationCard = memo(({ product, handleWishlist, isWishlisted }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  const { id, name, image, hoverImage, price, route } = product;

  const wishlisted = Boolean(isWishlisted(id));
  const formattedPrice = formatPrice(price);

  const showHoverImage =
    Boolean(hoverImage) && !imageError && isHovered && !prefersReducedMotion;

  const imageContent = (
    <ProductImages
      image={image}
      hoverImage={hoverImage}
      name={name}
      imageError={imageError}
      setImageError={setImageError}
      showHoverImage={showHoverImage}
      prefersReducedMotion={prefersReducedMotion}
    />
  );

  return (
    <article
      className='w-[min(68vw,220px)] min-w-0 shrink-0 snap-start sm:w-[230px] md:w-[250px] lg:w-[270px] xl:w-[280px]'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product image */}
      <div className='relative overflow-hidden rounded-xl bg-neutral-50 sm:rounded-2xl'>
        {route ? (
          <Link
            to={route}
            aria-label={`View ${name || 'product'}`}
            className='block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black sm:rounded-2xl'
          >
            {imageContent}
          </Link>
        ) : (
          imageContent
        )}

        {/* Wishlist button */}
        <button
          type='button'
          onClick={(event) => handleWishlist(event, product)}
          aria-label={
            wishlisted
              ? `Remove ${name || 'product'} from wishlist`
              : `Add ${name || 'product'} to wishlist`
          }
          aria-pressed={wishlisted}
          className='absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full  bg-white/95 text-neutral-700 shadow-sm transition-colors duration-200 hover:border-black hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:right-3 sm:top-3 sm:h-11 sm:w-11'
        >
          {wishlisted ? (
            <FaHeart aria-hidden='true' className='text-lg text-red-500' />
          ) : (
            <FaRegHeart aria-hidden='true' className='text-lg transition-colors' />
          )}
        </button>
      </div>

      {/* Product details */}
      <div className='mt-3 flex min-w-0 flex-col gap-1.5 px-0.5 sm:mt-4 sm:gap-2'>
        {route ? (
          <Link
            to={route}
            className='w-fit max-w-full rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2'
          >
            <h3 className='break-words text-xs font-semibold uppercase leading-5 tracking-wide text-black transition-colors hover:text-neutral-500 sm:text-sm md:text-base'>
              {name || 'Untitled product'}
            </h3>
          </Link>
        ) : (
          <h3 className='break-words text-xs font-semibold uppercase leading-5 tracking-wide text-black sm:text-sm md:text-base'>
            {name || 'Untitled product'}
          </h3>
        )}

        {formattedPrice ? (
          <p className='text-sm font-bold tabular-nums text-black sm:text-base md:text-lg'>
            {formattedPrice}
          </p>
        ) : (
          <p className='text-xs text-neutral-500'>Price unavailable</p>
        )}
      </div>
    </article>
  );
});

RecommendationCard.displayName = 'RecommendationCard';

/* =========================================
   PRODUCT IMAGES
========================================= */

const ProductImages = memo(
  ({
    image,
    hoverImage,
    name,
    imageError,
    setImageError,
    showHoverImage,
    prefersReducedMotion,
  }) => {
    const imageClass = 'absolute inset-0 h-full w-full object-contain object-center';

    return (
      <div className='relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-50 sm:rounded-2xl'>
        {!imageError && image ? (
          <>
            <motion.img
              src={image}
              alt={name || 'NBLX product'}
              loading='lazy'
              decoding='async'
              onError={() => setImageError(true)}
              initial={false}
              animate={{
                opacity: showHoverImage ? 0 : 1,
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.3,
              }}
              className={imageClass}
            />

            {hoverImage && (
              <motion.img
                src={hoverImage}
                alt=''
                aria-hidden='true'
                loading='lazy'
                decoding='async'
                initial={false}
                animate={{
                  opacity: showHoverImage ? 1 : 0,
                }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.3,
                }}
                className={`${imageClass} pointer-events-none`}
              />
            )}
          </>
        ) : (
          <div className='flex h-full items-center justify-center px-3 text-center text-xs text-neutral-500'>
            Image unavailable
          </div>
        )}

        <div aria-hidden='true' className='pointer-events-none absolute inset-0 bg-black/5' />
      </div>
    );
  },
);

ProductImages.displayName = 'ProductImages';

export default YouMayAlsoLike;
