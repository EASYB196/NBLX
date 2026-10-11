
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
//       JSON.stringify(wishlistItems),
//     );
//   }, [wishlistItems]);

//   /*
//    * ADD / REMOVE WISHLIST ITEM
//    *
//    * Product ID + Color = unique wishlist item
//    *
//    * This means:
//    *
//    * Black Crop Top ❤️
//    * White Crop Top ❤️
//    * Red Crop Top ❤️
//    *
//    * can all exist in the wishlist at the same time.
//    */
//   const toggleWishlist = (product) => {
//     if (!product?.id) return;

//     const selectedColor =
//       product.selectedColor || 'Default';

//     setWishlistItems((prevItems) => {
//       /*
//        * Check whether this EXACT product + color
//        * already exists.
//        */
//       const exists = prevItems.some(
//         (item) =>
//           String(item.id) === String(product.id) &&
//           (item.selectedColor || 'Default') ===
//             selectedColor,
//       );

//       /*
//        * If it exists, remove only that
//        * product + color combination.
//        */
//       if (exists) {
//         return prevItems.filter(
//           (item) =>
//             !(
//               String(item.id) === String(product.id) &&
//               (item.selectedColor || 'Default') ===
//                 selectedColor
//             ),
//         );
//       }

//       /*
//        * Get the complete image gallery.
//        *
//        * For a color variant, this will contain
//        * the images belonging to that color.
//        */
//       const images =
//         product.images?.length > 0
//           ? product.images
//           : [
//               product.image,
//               ...(product.hoverImage
//                 ? [product.hoverImage]
//                 : []),
//             ].filter(Boolean);

//       /*
//        * Add the new wishlist item.
//        */
//       return [
//         ...prevItems,
//         {
//           ...product,

//           id: product.id,

//           route: product.route,

//           /*
//            * Save every available image.
//            */
//           images,

//           /*
//            * Keep the first image as the
//            * main wishlist image.
//            */
//           image: product.image || images[0],

//           /*
//            * Save the selected color.
//            */
//           selectedColor,
//         },
//       ];
//     });
//   };

//   /*
//    * CHECK WHETHER A SPECIFIC PRODUCT + COLOR
//    * IS IN THE WISHLIST.
//    */
//   const isWishlisted = (id, color = 'Default') => {
//     return wishlistItems.some(
//       (item) =>
//         String(item.id) === String(id) &&
//         (item.selectedColor || 'Default') === color,
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
  useRef,
  useState,
} from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

/* eslint-disable react-refresh/only-export-components */

const WishlistContext = createContext(null);

const getWishlistKey = (uid) =>
  uid ? `wishlist:${uid}` : 'wishlist';

const parseWishlist = (value) => {
  try {
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to load wishlist:', error);
    return [];
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [storageKey, setStorageKey] = useState(null);
  const [ready, setReady] = useState(false);

  // Prevent an old wishlist from being written to a new user's storage.
  const currentKeyRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const key = getWishlistKey(user?.uid);

      currentKeyRef.current = key;
      setReady(false);

      let items = [];

      if (user) {
        const accountWishlist = localStorage.getItem(key);

        if (accountWishlist !== null) {
          items = parseWishlist(accountWishlist);
        } else {
          // Migrate the legacy guest wishlist once.
          const legacyWishlist = localStorage.getItem('wishlist');

          items = parseWishlist(legacyWishlist);

          if (legacyWishlist !== null) {
            localStorage.setItem(key, JSON.stringify(items));
            localStorage.removeItem('wishlist');
          }
        }
      } else {
        items = parseWishlist(localStorage.getItem('wishlist'));
      }

      setWishlistItems(items);
      setStorageKey(key);
      setReady(true);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!ready || !storageKey) return;

    // Ignore stale effects during account changes.
    if (currentKeyRef.current !== storageKey) return;

    localStorage.setItem(
      storageKey,
      JSON.stringify(wishlistItems),
    );
  }, [wishlistItems, storageKey, ready]);

  const toggleWishlist = (product) => {
    if (!product?.id) return;

    const selectedColor = product.selectedColor || 'Default';

    setWishlistItems((prevItems) => {
      const exists = prevItems.some(
        (item) =>
          String(item.id) === String(product.id) &&
          (item.selectedColor || 'Default') === selectedColor,
      );

      if (exists) {
        return prevItems.filter(
          (item) =>
            !(
              String(item.id) === String(product.id) &&
              (item.selectedColor || 'Default') === selectedColor
            ),
        );
      }

      const images =
        product.images?.length > 0
          ? product.images
          : [
              product.image,
              ...(product.hoverImage ? [product.hoverImage] : []),
            ].filter(Boolean);

      return [
        ...prevItems,
        {
          ...product,
          id: product.id,
          route: product.route,
          images,
          image: product.image || images[0],
          selectedColor,
        },
      ];
    });
  };

  const isWishlisted = (id, color = 'Default') =>
    wishlistItems.some(
      (item) =>
        String(item.id) === String(id) &&
        (item.selectedColor || 'Default') === color,
    );

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isWishlisted,
        wishlistReady: ready,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      'useWishlist must be used within WishlistProvider',
    );
  }

  return context;
};