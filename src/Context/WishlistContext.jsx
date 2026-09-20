// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from 'react';

// /* eslint-disable react-refresh/only-export-components */

// const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlistItems, setWishlistItems] = useState(() => {
//     const saved = localStorage.getItem('wishlist');

//     try {
//       return saved ? JSON.parse(saved) : [];
//     } catch (error) {
//       console.error('Failed to load wishlist:', error);
//       return [];
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem(
//       'wishlist',
//       JSON.stringify(wishlistItems)
//     );
//   }, [wishlistItems]);

//   const toggleWishlist = (product) => {
//     if (!product?.id) return;

//     setWishlistItems((prevItems) => {
//       const exists = prevItems.some(
//         (item) =>
//           String(item.id) === String(product.id)
//       );

//       if (exists) {
//         return prevItems.filter(
//           (item) =>
//             String(item.id) !== String(product.id)
//         );
//       }

//       return [
//         ...prevItems,
//         {
//           ...product,
//           id: product.id,
//           route: product.route,
//         },
//       ];
//     });
//   };

//   const isWishlisted = (id) => {
//     return wishlistItems.some(
//       (item) =>
//         String(item.id) === String(id)
//     );
//   };

//   return (
//     <WishlistContext.Provider
//       value={{
//         wishlistItems,
//         toggleWishlist,
//         isWishlisted,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () =>
//   useContext(WishlistContext);

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

/* eslint-disable react-refresh/only-export-components */

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('wishlist');

    try {
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load wishlist:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      'wishlist',
      JSON.stringify(wishlistItems),
    );
  }, [wishlistItems]);

  /*
   * ADD / REMOVE WISHLIST ITEM
   *
   * Product ID + Color = unique wishlist item
   *
   * This means:
   *
   * Black Crop Top ❤️
   * White Crop Top ❤️
   * Red Crop Top ❤️
   *
   * can all exist in the wishlist at the same time.
   */
  const toggleWishlist = (product) => {
    if (!product?.id) return;

    const selectedColor =
      product.selectedColor || 'Default';

    setWishlistItems((prevItems) => {
      /*
       * Check whether this EXACT product + color
       * already exists.
       */
      const exists = prevItems.some(
        (item) =>
          String(item.id) === String(product.id) &&
          (item.selectedColor || 'Default') ===
            selectedColor,
      );

      /*
       * If it exists, remove only that
       * product + color combination.
       */
      if (exists) {
        return prevItems.filter(
          (item) =>
            !(
              String(item.id) === String(product.id) &&
              (item.selectedColor || 'Default') ===
                selectedColor
            ),
        );
      }

      /*
       * Get the complete image gallery.
       *
       * For a color variant, this will contain
       * the images belonging to that color.
       */
      const images =
        product.images?.length > 0
          ? product.images
          : [
              product.image,
              ...(product.hoverImage
                ? [product.hoverImage]
                : []),
            ].filter(Boolean);

      /*
       * Add the new wishlist item.
       */
      return [
        ...prevItems,
        {
          ...product,

          id: product.id,

          route: product.route,

          /*
           * Save every available image.
           */
          images,

          /*
           * Keep the first image as the
           * main wishlist image.
           */
          image: product.image || images[0],

          /*
           * Save the selected color.
           */
          selectedColor,
        },
      ];
    });
  };

  /*
   * CHECK WHETHER A SPECIFIC PRODUCT + COLOR
   * IS IN THE WISHLIST.
   */
  const isWishlisted = (id, color = 'Default') => {
    return wishlistItems.some(
      (item) =>
        String(item.id) === String(id) &&
        (item.selectedColor || 'Default') === color,
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () =>
  useContext(WishlistContext);
