// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaHeart } from 'react-icons/fa';
// import { useWishlist } from '../Context/WishlistContext';
// import BreadCrumb from '../components/BreadCrumb';

// function Wishlist() {
//   const { wishlistItems, toggleWishlist } = useWishlist();

//   return (
//     <div className='max-w-7xl mx-auto px-4 md:px-8 py-10 mt-2 min-h-screen'>
//       <BreadCrumb category='Wishlist' />

//       {/* HEADER */}
//       <div className='mb-10'>
//         <h1 className='text-3xl md:text-4xl font-bold'>My Wishlist</h1>

//         <p className='text-gray-500 mt-2'>
//           {wishlistItems.length} item(s) saved
//         </p>
//       </div>

//       {/* EMPTY STATE */}
//       {wishlistItems.length === 0 ? (
//         <div className='flex flex-col items-center justify-center py-20'>
//           <FaHeart className='text-6xl text-gray-300 mb-4' />

//           <h2 className='text-2xl font-semibold mb-2'>
//             Your wishlist is empty
//           </h2>

//           <p className='text-gray-500 text-center'>
//             Add products to your wishlist and they'll appear here.
//           </p>
//         </div>
//       ) : (
//         <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
//           {wishlistItems.map((item) => (
//             <div
//               key={item.id}
//               className='bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300'
//             >
//               {/* CLICKABLE PRODUCT */}
//               <Link to={item.route}>
//                 {' '}
//                 <div className='overflow-hidden'>
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className='w-full h-72 md:h-80 object-cover hover:scale-105 transition duration-300'
//                   />
//                 </div>

//                 <div className='p-4'>
//                   <h3 className='font-semibold text-lg'>
//                     {item.name}
//                   </h3>

//                   <p className='mt-2 font-bold'>
//                     ₦{item.price.toLocaleString('en-NG')}
//                   </p>
//                 </div>
//               </Link>

//               {/* REMOVE BUTTON */}
//               <div className='px-4 pb-4'>
//                 <button
//                   onClick={() => toggleWishlist(item)}
//                   className='w-full py-2 cursor-copy rounded-lg bg-[#ff0000] text-white hover:bg-[#ff0000] transition'
//                 >
//                   Remove from Wishlist
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Wishlist;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { useWishlist } from '../Context/WishlistContext';
import BreadCrumb from '../components/BreadCrumb';

function Wishlist() {
  const { wishlistItems, toggleWishlist } = useWishlist();

  const [imageIndexes, setImageIndexes] = useState({});

  /*
   * Get all images for each wishlist item
   */
  const getItemImages = (item) => {
    if (item.images?.length > 0) {
      return item.images;
    }

    return [
      item.image,
      ...(item.hoverImage ? [item.hoverImage] : []),
    ].filter(Boolean);
  };

  /*
   * Make each product + color unique
   *
   * Example:
   * crop-1-Black
   * crop-1-White
   * crop-1-Red
   */
  const getWishlistKey = (item) => {
    return `${item.id}-${item.selectedColor || 'Default'}`;
  };

  /*
   * Keep indexes valid when wishlist changes
   */
  useEffect(() => {
    setImageIndexes((prev) => {
      const updated = {};

      wishlistItems.forEach((item) => {
        const images = getItemImages(item);
        const wishlistKey = getWishlistKey(item);

        const currentIndex = prev[wishlistKey] ?? 0;

        updated[wishlistKey] =
          currentIndex < images.length ? currentIndex : 0;
      });

      return updated;
    });
  }, [wishlistItems]);

  /*
   * PREVIOUS IMAGE
   */
  const handlePrev = (wishlistKey, imageCount) => {
    setImageIndexes((prev) => ({
      ...prev,
      [wishlistKey]:
        ((prev[wishlistKey] ?? 0) - 1 + imageCount) %
        imageCount,
    }));
  };

  /*
   * NEXT IMAGE
   */
  const handleNext = (wishlistKey, imageCount) => {
    setImageIndexes((prev) => ({
      ...prev,
      [wishlistKey]:
        ((prev[wishlistKey] ?? 0) + 1) %
        imageCount,
    }));
  };

  /*
   * SELECT THUMBNAIL
   */
  const handleImageSelect = (wishlistKey, index) => {
    setImageIndexes((prev) => ({
      ...prev,
      [wishlistKey]: index,
    }));
  };

  return (
    <div className='max-w-7xl mx-auto px-4 md:px-8 py-10 mt-2 min-h-screen'>
      <BreadCrumb category='Wishlist' />

      {/* HEADER */}
      <div className='mb-10'>
        <h1 className='text-3xl md:text-4xl font-bold'>
          My Wishlist
        </h1>

        <p className='text-gray-500 mt-2'>
          {wishlistItems.length} item(s) saved
        </p>
      </div>

      {/* EMPTY STATE */}
      {wishlistItems.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20'>
          <FaHeart className='text-6xl text-gray-300 mb-4' />

          <h2 className='text-2xl font-semibold mb-2'>
            Your wishlist is empty
          </h2>

          <p className='text-gray-500 text-center'>
            Add products to your wishlist and they'll appear here.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {wishlistItems.map((item) => {
            const images = getItemImages(item);

            const wishlistKey = getWishlistKey(item);

            const currentIndex =
              imageIndexes[wishlistKey] ?? 0;

            const currentImage =
              images[currentIndex] || images[0];

            return (
              <div
                key={wishlistKey}
                className='bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300'
              >
                {/* IMAGE AREA */}
                <div className='relative'>
                  {/* MAIN IMAGE */}
                  <Link to={item.route}>
                    <div className='overflow-hidden'>
                      <img
                        src={currentImage}
                        alt={item.name}
                        className='w-full h-72 md:h-80 object-cover hover:scale-105 transition duration-300'
                      />
                    </div>
                  </Link>

                  {/* ARROWS */}
                  {images.length > 1 && (
                    <>
                      <button
                        type='button'
                        onClick={() =>
                          handlePrev(
                            wishlistKey,
                            images.length,
                          )
                        }
                        className='absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:bg-white transition z-10'
                        aria-label='Previous image'
                      >
                        <FaChevronLeft />
                      </button>

                      <button
                        type='button'
                        onClick={() =>
                          handleNext(
                            wishlistKey,
                            images.length,
                          )
                        }
                        className='absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:bg-white transition z-10'
                        aria-label='Next image'
                      >
                        <FaChevronRight />
                      </button>
                    </>
                  )}
                </div>

                {/* THUMBNAILS */}
                {images.length > 1 && (
                  <div className='flex gap-2 px-3 pt-3 overflow-x-auto'>
                    {images.map((img, index) => (
                      <button
                        key={`${img}-${index}`}
                        type='button'
                        onClick={() =>
                          handleImageSelect(
                            wishlistKey,
                            index,
                          )
                        }
                        className={`shrink-0 rounded-md overflow-hidden border-2 transition ${
                          currentIndex === index
                            ? 'border-black'
                            : 'border-transparent'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${item.name} view ${index + 1}`}
                          className='w-12 h-14 object-cover'
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* PRODUCT INFO */}
                <Link to={item.route}>
                  <div className='p-4'>
                    <h3 className='font-semibold text-lg'>
                      {item.name}
                    </h3>

                    <p className='mt-2 font-bold'>
                      ₦{item.price.toLocaleString('en-NG')}
                    </p>

                    {item.selectedColor &&
                      item.selectedColor !== 'Default' && (
                        <p className='text-sm text-gray-500 mt-1'>
                          Color: {item.selectedColor}
                        </p>
                      )}
                  </div>
                </Link>

                {/* REMOVE */}
                <div className='px-4 pb-4'>
                  <button
                    type='button'
                    onClick={() => toggleWishlist(item)}
                    className='w-full py-2 cursor-copy rounded-lg bg-[#ff0000] text-white hover:bg-[#ff0000] transition'
                  >
                    Remove from Wishlist
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Wishlist;

