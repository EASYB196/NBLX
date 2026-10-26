
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import {
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
  FaShoppingBag,
  FaTrashAlt,
} from 'react-icons/fa';

import { useWishlist } from '../Context/WishlistContext';
import BreadCrumb from '../components/BreadCrumb';

const getItemImages = (item) => {
  const images = Array.isArray(item.images) ? item.images : [];
  const fallbackImages = [
    item.image,
    item.hoverImage,
  ].filter(Boolean);

  return [
    ...new Set(
      (images.length ? images : fallbackImages).filter(Boolean),
    ),
  ];
};

const getWishlistKey = (item) =>
  `${item.id}-${item.selectedColor || 'Default'}`;

const formatPrice = (price) => {
  const numericPrice = Number(price);

  return Number.isFinite(numericPrice)
    ? `₦${numericPrice.toLocaleString('en-NG')}`
    : 'Price unavailable';
};

function Wishlist() {
  const { wishlistItems = [], toggleWishlist } = useWishlist();

  const [imageIndexes, setImageIndexes] = useState({});

  const itemsWithImages = useMemo(
    () =>
      wishlistItems.map((item) => ({
        ...item,
        wishlistKey: getWishlistKey(item),
        images: getItemImages(item),
      })),
    [wishlistItems],
  );

  // Keep image indexes valid when wishlist items change.
  useEffect(() => {
    setImageIndexes((previousIndexes) => {
      const nextIndexes = {};

      itemsWithImages.forEach(({ wishlistKey, images }) => {
        const previousIndex = previousIndexes[wishlistKey] ?? 0;

        nextIndexes[wishlistKey] =
          images.length > 0 && previousIndex < images.length
            ? previousIndex
            : 0;
      });

      return nextIndexes;
    });
  }, [itemsWithImages]);

  const changeImage = useCallback(
    (wishlistKey, imageCount, direction) => {
      if (imageCount < 2) return;

      setImageIndexes((previousIndexes) => ({
        ...previousIndexes,
        [wishlistKey]:
          ((previousIndexes[wishlistKey] ?? 0) +
            direction +
            imageCount) %
          imageCount,
      }));
    },
    [],
  );

  const selectImage = useCallback((wishlistKey, index) => {
    setImageIndexes((previousIndexes) => ({
      ...previousIndexes,
      [wishlistKey]: index,
    }));
  }, []);

  const removeItem = useCallback(
    (item) => {
      toggleWishlist(item);
    },
    [toggleWishlist],
  );

    const memoizedWishlistItems = useMemo(() => wishlistItems, [wishlistItems]);


  return (
    <main className="mx-auto mt-2 min-h-screen w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <BreadCrumb category="Wishlist" />

    {/* HEADER */}
      <div className='mb-10 mt-4'>
        <span className='mb-2 inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-400'>
          Saved Artifacts
        </span>
        <h1 className='text-3xl font-serif font-light tracking-tight text-neutral-950 sm:text-4xl md:text-5xl'>
          My Wishlist
        </h1>
        <p className='text-neutral-500 text-sm sm:text-base font-light mt-2'>
          {memoizedWishlistItems.length} item{memoizedWishlistItems.length !== 1 ? 's' : ''} saved for later
        </p>
      </div>

      {/* Empty wishlist */}
      {wishlistItems.length === 0 ? (
        <section className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-5 py-16 text-center sm:min-h-[420px]">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-neutral-200">
            <FaHeart
              aria-hidden="true"
              className="text-2xl text-neutral-400"
            />
          </div>

          <h2 className="text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl">
            Your wishlist is empty
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
            Save your favourite pieces as you browse, and they’ll
            be waiting for you here.
          </p>

          <Link
            to="/category"
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white! transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            <FaShoppingBag aria-hidden="true" />
            Continue shopping
            <FaArrowRight
              aria-hidden="true"
              className="text-xs"
            />
          </Link>
        </section>
      ) : (
        /* Wishlist products */
        <section
          aria-label="Wishlist products"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
        >
          {itemsWithImages.map((item) => {
            const { wishlistKey, images } = item;

            const currentIndex = imageIndexes[wishlistKey] ?? 0;

            const currentImage =
              images[currentIndex] || images[0] || '';

            const productRoute = item.route || '/collections';

            return (
              <article
                key={wishlistKey}
                className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-shadow duration-300 hover:shadow-lg"
              >
                {/* Product image */}
                <div className="relative overflow-hidden bg-neutral-100">
                  <Link
                    to={productRoute}
                    aria-label={`View ${item.name || 'product'}`}
                    className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black"
                  >
                    <div className="aspect-[4/5] w-full overflow-hidden">
                      {currentImage ? (
                        <img
                          src={currentImage}
                          alt={item.name || 'Wishlist product'}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-neutral-500">
                          Image unavailable
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Remove from wishlist */}
                  <button
                    type="button"
                    onClick={() => removeItem(item)}
                    aria-label={`Remove ${item.name || 'product'} from wishlist`}
                    title="Remove from wishlist"
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white/95 text-neutral-700 shadow-sm transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                  >
                    <FaTrashAlt
                      aria-hidden="true"
                      className="text-sm"
                    />
                  </button>

                  {/* Image navigation */}
                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          changeImage(
                            wishlistKey,
                            images.length,
                            -1,
                          )
                        }
                        aria-label={`Previous image for ${item.name || 'product'}`}
                        className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-neutral-800 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                      >
                        <FaChevronLeft
                          aria-hidden="true"
                          className="text-xs"
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          changeImage(
                            wishlistKey,
                            images.length,
                            1,
                          )
                        }
                        aria-label={`Next image for ${item.name || 'product'}`}
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-neutral-800 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                      >
                        <FaChevronRight
                          aria-hidden="true"
                          className="text-xs"
                        />
                      </button>

                      {/* Image indicators */}
                      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/65 px-2.5 py-1.5">
                        {images.map((image, index) => (
                          <button
                            key={`${image}-${index}`}
                            type="button"
                            onClick={() =>
                              selectImage(wishlistKey, index)
                            }
                            aria-label={`Show image ${index + 1} of ${images.length}`}
                            aria-current={
                              currentIndex === index
                                ? 'true'
                                : undefined
                            }
                            className={`h-1.5 rounded-full transition-all ${
                              currentIndex === index
                                ? 'w-4 bg-white'
                                : 'w-1.5 bg-white/60 hover:bg-white'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Image thumbnails */}
                {images.length > 1 && (
                  <div
                    className="flex gap-2 overflow-x-auto border-b border-neutral-100 px-3 py-3"
                    aria-label={`${item.name || 'Product'} image thumbnails`}
                  >
                    {images.map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() =>
                          selectImage(wishlistKey, index)
                        }
                        aria-label={`Select image ${index + 1}`}
                        aria-pressed={currentIndex === index}
                        className={`h-14 w-12 shrink-0 overflow-hidden rounded-md border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 ${
                          currentIndex === index
                            ? 'border-black'
                            : 'border-transparent hover:border-neutral-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Product details */}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <Link
                    to={productRoute}
                    className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                  >
                    <h2 className="break-words text-base font-semibold leading-6 text-neutral-950 transition-colors hover:text-neutral-600 sm:text-lg">
                      {item.name || 'Untitled product'}
                    </h2>
                  </Link>

                  <p className="mt-2 text-base font-bold text-neutral-950">
                    {formatPrice(item.price)}
                  </p>

                  {item.selectedColor &&
                    item.selectedColor !== 'Default' && (
                      <p className="mt-2 text-sm text-neutral-500">
                        Color:{' '}
                        <span className="font-medium text-neutral-800">
                          {item.selectedColor}
                        </span>
                      </p>
                    )}

                  <div className="mt-auto pt-5">
                    <Link
                      to={productRoute}
                      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 px-4 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:border-black hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                      View product
                      <FaArrowRight
                        aria-hidden="true"
                        className="text-xs"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}

export default Wishlist;



